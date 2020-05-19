/* /pages/index.js */

import ExaminationList from "../components/ExaminationList";
import React, {useState} from "react";
import securePage from "../hocs/securePage";
import {
  Alert,
  Button,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  Row,
} from "reactstrap";
import Router from "next/dist/next-server/server/router";
import ErrorModal from "../components/Common/ErrorModal";

class Index extends React.Component {
  constructor(props) {
    super(props);
    //query state will be passed to ExaminationList for the filter query
    this.state = {
      query: "",
      examCode:"",
      
      examDone: false,
      examOutDated: false,
      redirectLink: "",
      errorState: false,
      errorMessage:"",
      
    };
    let examCodeFound = false;
    let examDone = false;
    let examOutDated = false;
    
  }

  onChange(e) {
    //set the state = to the input typed in the search Input Component
    //this.state.query gets passed into ExaminationList to filter the results
    this.setState({ 
        query: e.target.value.toLowerCase() 
    });
  }

  onChangeExamCode(e) {
    this.setState({ 
        examCode: e.target.value
    });
    console.log(this.state);
  }
  onExamCodeFound (){
    this.examCodeFound = true;    
  }
  onExamDone () {
    this.examDone = true;
  }

  onExamOutDated() {
    this.examOutDated= true;
  }
  onSubmitExamCode() {
    if(this.examCodeFound===false){
      this.setState({
        errorState: true,
        errorMessage: "Examination not found"
      })
    }
    if(this.examOutDated===true){
      this.setState({
        errorState: true,
        errorMessage: "Exam has expired"
      })
    }
    if(this.examDone===true){
      this.setState({
        errorState: true,
        errorMessage: "You have done this Exam before"
      })
    }    
  }

  hideModal() {
    this.setState({
      errorState: false,
    });
    this.examCodeFound = false;
    this.examDone = false;
    this.examOutDated = false;
  }
  
  render() {
    this.examCodeFound = false;
    this.examDone = false;
    this.examOutDated = false;

    return (
      
      <div className="container-fluid">
        
        
      
        <ErrorModal
            errorState={this.state.errorState}
            errorMessage={this.state.errorMessage}
            hideModal={this.hideModal.bind(this)}
          />
        <Row>
          <Col>
            <div className="search">
              <InputGroup>    
                <InputGroupAddon addonType="append"> Search </InputGroupAddon>
                <Input placeholder="Search exam by name" onChange={this.onChange.bind(this)} />
              </InputGroup>
              
            </div>
            <h4>OR</h4>
                
            <ExaminationList 
                loggedUser={this.props.loggedUser}
                search={this.state.query} 
                examCode={this.state.examCode}
                examCodeFound={this.state.examCodeFound}
                redirectLink={this.state.redirectLink}
                onExamDone={this.onExamDone.bind(this)}
                onChangeExamCode={this.onChangeExamCode.bind(this)}
                onExamCodeFound={this.onExamCodeFound.bind(this)}
                onExamOutDated={this.onExamOutDated.bind(this)}
                onSubmitExamCode={this.onSubmitExamCode.bind(this)}
                hideModal={this.hideModal.bind(this)}
                />
          </Col>
          
        </Row>
        <style jsx>
          {`
            .search {
              margin: 20px;
              width: 500px;
            }
          `}
        </style>
      </div>
    );
  }
}

export default securePage(Index);