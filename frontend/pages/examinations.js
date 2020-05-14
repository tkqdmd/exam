/* /pages/examinations.js */

import gql from "graphql-tag";
import Router, {withRouter} from "next/router";
import {graphql} from "react-apollo";
import {compose} from "recompose";
import React from 'react';
import Strapi from "strapi-sdk-javascript/build/main";
import securePage from "../hocs/securePage";
import {Question} from "../components/Question";
import {Button} from "reactstrap";

const apiUrl = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);
var _ = require("underscore");

class Examinations extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            radioItems: [],
            checkboxItems: [],
            inputItems: [],
            questions: [],
            time: {},
            seconds: 1,
            started: false,
        }
        this.timer = 0;
        this.submitExam = this.submitExam.bind(this);
        this.startExamTime = this.startExamTime.bind(this);
        this.countDown = this.countDown.bind(this);
    }

    startExamTime() {
        const examination = this.props.data.examination;
        const questionList = examination.radioquestions.concat(examination.checkboxquestions, examination.textquestions);
        this.setState({
            seconds: examination.examTime * 60,
            time: this.secondsToTime(examination.examTime * 60),
            questions: _.shuffle(questionList),
            started: true,
        });
        if (this.timer == 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
        strapi
            .createEntry("examusers", {
                email: this.props.loggedUser,
                examCode: examination.code,
            });
    }

    secondsToTime(secs) {
        let hours = Math.floor(secs / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        let obj = {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
        return obj;
    }

    countDown() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        });
        // Check if we're at zero.
        if (seconds == 0) {
            // alert("Time out. Auto Submited");
            this.submitExam();
            Router.push("/")

            clearInterval(this.timer);
        }
    }

    onInputChange = (e) => {
        console.log(e.target);

        var copyItems = this.state.inputItems;
        console.log(copyItems);
        var check = false;
        if (copyItems.length > 0) {
            for (var i = 0; i < copyItems.length; i++) {
                if (copyItems[i].name == e.target.name) {
                    copyItems[i].value = e.target.value.trim().toLowerCase();
                    check = true;
                }
            }
        }
        if (check === false) {
            copyItems.push({name: e.target.name, value: e.target.value})
        }
        this.setState({
            inputItems: copyItems
        });
    };

    onRadioChange = (e) => {
        console.log(e.target);
        var copyItems = this.state.radioItems;
        console.log(copyItems);
        var check = false;
        if (copyItems.length > 0) {
            for (var i = 0; i < copyItems.length; i++) {
                if (copyItems[i].name == e.target.name) {
                    copyItems[i].value = e.target.value;
                    check = true;
                }
            }
        }
        if (check === false) {
            copyItems.push({name: e.target.name, value: e.target.value});
        }
        this.setState({
            radioItems: copyItems
        });
    };

    onCheckboxChange = (e) => {
        var copyItems = this.state.checkboxItems;
        var check = false;
        if (copyItems.length > 0) {
            for (var i = 0; i < copyItems.length; i++) {
                if (copyItems[i].name == e.target.name) {
                    var index = copyItems[i].value.indexOf(e.target.value);
                    if (index == -1) {
                        copyItems[i].value = copyItems[i].value + " " + e.target.value;
                    } else {
                        if (index == 0) {
                            copyItems[i].value = copyItems[i].value.substring(2);
                        } else {
                            if (index == copyItems[i].value.length) {
                                copyItems[i].value = copyItems[i].value.substring(0, index - 2);
                            } else copyItems[i].value = copyItems[i].value.substring(0, index - 1) + copyItems[i].value.substring(index + 1);
                        }
                    }
                    check = true;
                }
            }
        }
        if (check === false) {
            copyItems.push({name: e.target.name, value: e.target.value})
        }
        this.setState({
            checkboxItems: copyItems
        });
    };

    submitExam() {
        var examination = this.props.data.examination;
        const radioItems = this.state.radioItems;
        const checkboxItems = this.state.checkboxItems;
        const inputItems = this.state.inputItems;
        let point = 0;
        for (var i = 0; i < radioItems.length; i++) {
            this.state.questions.filter(ques => (ques.type == "radio")).forEach(
                q => {
                    if (q.id == radioItems[i].name.substring(5) && q.answer == radioItems[i].value) {
                        point++;
                    }
                }
            )
        }
        for (var i = 0; i < checkboxItems.length; i++) {
            this.state.questions.filter(ques => (ques.type == "checkbox")).forEach(
                q => {
                    var check = true;
                    if (q.id == checkboxItems[i].name.substring(8) && q.answer.length == checkboxItems[i].value.length) {
                        for (var j = 0; j < q.answer.length; j += 2) {
                            if (checkboxItems[i].value.indexOf(q.answer.charAt(j)) == -1) {
                                check = false;
                                break;
                            }
                        }
                        if (check == true) point++;
                    }
                }
            )
        }
        for (var i = 0; i < inputItems.length; i++) {
            this.state.questions.filter(ques => (ques.type == "text")).forEach(
                q => {
                    if (q.id == inputItems[i].name.substring(4) && q.answer.trim().toLowerCase() == inputItems[i].value.trim().toLowerCase()) {
                        point++;
                    }
                }
            )
        }
        point = (point / this.state.questions.length) * 10;
        strapi
            .createEntry("results", {
                point: point,
                email: this.props.loggedUser,
                username: this.props.loggedUsername,
                examCode: examination.code,
                datetime: new Date() + "",
            }).then(Router.push("/"));
        console.log(examination.code);

    };


    render() {
        const {
            data: {loading, error, examination, examusers},
            router,
            context,
            isAuthenticated,
            items,
        } = this.props;
        if (error) return "Error Loading Questions";

        if (examination) {

            if (examination.radioquestions.length === 0 && examination.checkboxquestions.length === 0 && examination.textquestions.length === 0) return <h5>
                <br></br>Exam don't have any questions</h5>;

            if (this.state.started === false) return (
                <div>
                    <h2>{examination.name}</h2>
                    <h6><i>{examination.description}</i></h6>
                    <h6><i>Time for this exam is: {examination.examTime} minutes</i></h6>
                    <Button style={{marginTop: "30px"}} color="danger" size="lg"
                            onClick={this.startExamTime}>Start</Button>
                </div>
            );
            let pos = 1;
            return (
                <>
                    <h2>{examination.name}</h2>
                    <h6><i>{examination.description}</i></h6>
                    <div style={{display: 'flex'}}>
                        <h6 style={{marginRight: "10px"}}>Time left: </h6>
                        <span>{this.state.time.h}h</span> :
                        <span>{this.state.time.m}m</span> :
                        <span>{this.state.time.s}s</span>
                    </div>
                    <div style={{display: "inline-block"}} className="h-100">
                        {this.state.questions.map(res => (
                            <div>
                                <Question
                                    pos={pos++}
                                    question={res}
                                    onInputChange={this.onInputChange}
                                    onRadioChange={this.onRadioChange}
                                    onCheckboxChange={this.onCheckboxChange}
                                />
                                <style jsx>
                                    {`
                                    a {
                                        color: white;
                                    }
                                    a:link {
                                        text-decoration: none;
                                        color: white;
                                    }
                                    .container-fluid {
                                        margin-bottom: 30px;
                                    }
                                    .btn-outline-primary {
                                        color: #007bff !important;
                                    }
                                    a:hover {
                                        color: white !important;
                                    }
                                    `}
                                </style>
                            </div>

                        ))}
                        <Button style={{marginTop: "30px"}} color="danger" size="lg"
                                onClick={this.submitExam}>Submit</Button>
                    </div>
                </>
            );
        }
        return <h1><br></br>Examination not found</h1>;
    }
}

const GET_EXAMINATION_QUESTIONS = gql`
    query($id: ID!) {
        examination(id: $id) {
            id
            name
            description
            code
            startTime
            endTime
            examTime
            radioquestions{
                id
                type
                question
                answerA
                answerB
                answerC
                answerD
                answer
            }
            checkboxquestions{
                id
                type
                question
                answerA
                answerB
                answerC
                answerD
                answer
            }
            textquestions{
                id
                type
                question
                answer
            }
        }

    }
`;
// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (ExaminationList)

export default compose(
    withRouter,
    securePage,
    graphql(GET_EXAMINATION_QUESTIONS, {
        options: props => {
            return {
                variables: {
                    id: props.router.query.id
                }
            };
        },
        props: ({data}) => ({data})
    }),
)(Examinations);