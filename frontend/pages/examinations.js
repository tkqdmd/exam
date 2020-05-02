/* /pages/examinations.js */

import gql from "graphql-tag";
import { withRouter } from "next/router";
import { graphql } from "react-apollo";
import { compose } from "recompose";
import React from 'react';
import Strapi from "strapi-sdk-javascript/build/main";
import securePage from "../hocs/securePage";
import { Answers } from "../components/answers";
import Router from "next/router";
import {Button} from "reactstrap";

const apiUrl = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);

class Examinations extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
    }
    this.submitExam = this.submitExam.bind(this);
  }
  
  onChange = (e) => {
      var copyItems = this.state.items;
      var check = false;
      if(copyItems.length > 0){
        for (var i = 0; i < copyItems.length; i++){
          if(copyItems[i].name == e.target.name) {
            copyItems[i].value = e.target.value;
            check = true;
          }
        }
      }
      if(check === false){
        copyItems.push({name : e.target.name , value: e.target.value})
      }
      this.setState({
        items: copyItems
      });
      console.log(this.state.items);
  };
  submitExam () {
      var examination = this.props.data.examination;
      const copyItems = this.state.items;
      let point = 0;
      for (var i = 0; i < copyItems.length; i++){
            examination.questions.forEach(
                q => {
                    if (q.id == copyItems[i].name && q.answer == copyItems[i].value){
                        point++;
                    }
                }
            )
      }
      strapi
          .createEntry("results", {
              point: point,
              username: this.props.loggedUser,
              examCode: examination.code,
              datetime: new Date()+7,
            }).then(Router.push("/"));
          console.log(examination.code);
          
       
  };
  render() {
    const {
      data: { loading, error, examination },
      router,
      context,
      isAuthenticated,
      items,
    } = this.props;
    if (error) return "Error Loading Questions";

    if (examination) {
      if(new Date() < examination.startTime || new Date() > examination.endTime) return <h5><br></br>Exam is timeout</h5>;
      if( examination.questions.length===0) return <h5><br></br>Exam don't have any questions</h5>;
      let pos = 1;
      return (
        <>
          <h2>{examination.name}</h2>
          <h5><i>{examination.description}</i></h5>
              <div style={{ display: "inline-block" }} className="h-100">
                {examination.questions.map(res => (
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
                <Button style={{marginTop: "30px" }} color="danger" size="lg" onClick={this.submitExam}>Submit</Button>
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
    props: ({ data }) => ({ data })
  }),
)(Examinations);