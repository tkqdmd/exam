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
import ErrorAlert from "../components/Common/ErrorAlert";



class Index extends React.Component {
  constructor(props) {
    super(props);
    //query state will be passed to ExaminationList for the filter query
    this.state = {
      query: "",
      examCode:"",
      examCodeFound: false,
      redirectLink: "",
      errorState: false,
      errorMessage:"",
    };
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
  }
  onExamCodeFound() {
    this.setState({
        examCodeFound: true,
    });
  }
  onSubmitExamCode() {
    if(this.state.examCodeFound===false){
      this.setState({
        errorState: true,
        errorMessage: "Examination not found"
      })
    }
    
  }
  
  render() {
    // console.log(this.props.isAuthenticated);
    return (
      
      <div className="container-fluid">
        <ErrorAlert
          errorState={this.state.errorState}
          errorMessage={this.state.errorMessage}
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
                search={this.state.query} 
                examCode={this.state.examCode}
                examCodeFound={this.state.examCodeFound}
                redirectLink={this.state.redirectLink}
                onChangeExamCode={this.onChangeExamCode.bind(this)}
                onExamCodeFound={this.onExamCodeFound.bind(this)}
                onSubmitExamCode={this.onSubmitExamCode.bind(this)}
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