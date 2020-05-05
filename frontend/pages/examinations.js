/* /pages/examinations.js */

import gql from "graphql-tag";
import Router, {withRouter} from "next/router";
import {graphql} from "react-apollo";
import {compose} from "recompose";
import React from 'react';
import Strapi from "strapi-sdk-javascript/build/main";
import securePage from "../hocs/securePage";
import {Answers} from "../components/answers";
import {Button} from "reactstrap";

const apiUrl = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);
var _ = require("underscore");

class Examinations extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
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
        this.setState({
            seconds: examination.examTime * 60,
            time: this.secondsToTime(examination.examTime * 60),
            questions: _.shuffle(examination.questions),
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

    onChange = (e) => {
        var copyItems = this.state.items;
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
            copyItems.push({name: e.target.name, value: e.target.value})
        }
        this.setState({
            items: copyItems
        });
    };

    submitExam() {
        var examination = this.props.data.examination;
        const copyItems = this.state.items;
        let point = 0;
        for (var i = 0; i < copyItems.length; i++) {
            examination.questions.forEach(
                q => {
                    if (q.id == copyItems[i].name && q.answer == copyItems[i].value) {
                        point++;
                    }
                }
            )
        }
        point = (point / examination.questions.length) * 10;
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
            const checkList = examusers.filter(eu => (
                eu.email === this.props.loggedUser
            )).filter(e => (
                e.examCode === examination.code
            ));
            console.log(examusers);
            if (checkList.length !== 0) return <h5><br></br>You have done this Exam before</h5>;
            if (new Date() < new Date(examination.startTime) || new Date() > new Date(examination.endTime)) return <h5>
                <br></br>Exam has expired</h5>;

            if (examination.questions.length === 0) return <h5><br></br>Exam don't have any questions</h5>;

            if (this.state.started === false) return (
                <div>
                    <h2>{examination.name}</h2>
                    <h5><i>{examination.description}</i></h5>
                    <h6><i>Time for this exam is: {examination.examTime} minutes</i></h6>
                    <Button style={{marginTop: "30px"}} color="danger" size="lg"
                            onClick={this.startExamTime}>Start</Button>
                </div>
            );
            let pos = 1;
            return (
                <>
                    <h2>{examination.name}</h2>
                    <h5><i>{examination.description}</i></h5>
                    <div style={{display: 'flex'}}>
                        <h6 style={{marginRight: "10px"}}>Time left: </h6>
                        <span>{this.state.time.h}h</span> :
                        <span>{this.state.time.m}m</span> :
                        <span>{this.state.time.s}s</span>
                    </div>
                    <div style={{display: "inline-block"}} className="h-100">
                        {this.state.questions.map(res => (
                            <div>
                                <div style={{marginTop: "30px"}}>
                                    <h5>Question {pos++}: {res.question}</h5>
                                    <Answers
                                        res={res}
                                        onChange={this.onChange}
                                    ></Answers>
                                </div>
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
            questions {
                id
                question
                answerA
                answerB
                answerC
                answerD
                answer
            }
        }

        examusers {
            email
            examCode
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