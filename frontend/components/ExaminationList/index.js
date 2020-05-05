/* components/ExaminationList/index.js */
import { useState } from "react";
import gql from "graphql-tag";
import Link from "next/link";
import {graphql, from} from "react-apollo";
import {
    Button,
    Card,
    CardBody,
    CardColumns,
    CardText,
    CardTitle,
    Col,
    Input,
    InputGroup,
    InputGroupAddon,
    UncontrolledAlert
} from "reactstrap";

const ExaminationList = (
  
  { data: { error, examinations }, search, examCode, onChangeExamCode, onExamCodeFound, onSubmitExamCode }) => {
  
  if (error) {
    console.log(error);
    
    return "Error loading examinations";
  }
  //if examinations are returned from the GraphQL query, run the filter query
  //and set equal to variable examinationSearch

  if (examinations && examinations.length) {
    //searchQuery
    const searchQuery = examinations.filter(query =>
      query.name.toLowerCase().includes(search)
    ).filter(ex => (
      ex.private === false
    )).filter(e => (
      new Date() >= new Date(e.startTime) && new Date() <= new Date(e.endTime)
    ));
    const targetExam = examinations.filter(tar =>
      tar.code == examCode
    );
    let examId;
    let redirectLink="javascript:void(0);";
    if(targetExam.length === 1) {
        examId = targetExam[0].id;
        redirectLink= "/examinations/"+examId;
        onExamCodeFound;
    }
          
    if (searchQuery.length != 0) {
      return (
        
        <div>
          <Col>
            <div>
                <br></br>
                <div className="examCode">
                  <InputGroup style={{ width: "100%", margin: "0 00px 30px"}}>
                      <Input placeholder="Enter your exam code" onChange={onChangeExamCode}/> 
                      <InputGroupAddon addonType="prepend"><Button onClick={onSubmitExamCode} href={redirectLink}>Join with exam code</Button></InputGroupAddon>
                  </InputGroup>
                </div>
            </div>
          </Col>
          <div className="h-100">
            <CardColumns>
            {searchQuery.map(res => (
              <Card
                outline color="primary"
                style={{ width: "100%", margin: "0 10px 20px"}}
                className="h-100"
                key={res.id}
              >
              
                <CardBody>
                  <CardTitle><h5>{res.name}</h5></CardTitle>
                  <CardText>{res.description}</CardText>
                  <CardText style={{ fontSize: "12px", margin: "0px"}}><i>Open at: {res.startTime}</i></CardText>
                  <CardText style={{ fontSize: "12px", margin: "0px"}}><i>Close at: {res.endTime}</i></CardText>
                </CardBody>
                <div className="card-footer">
                  <Link
                    as={`/examinations/${res.id}`}
                    href={`/examinations?id=${res.id}`}
                  >
                    <a className="btn btn-primary">Join</a>
                  </Link>
                </div>
              </Card>
            ))}
            </CardColumns>
          </div>

          <style jsx global>
            {`
              a {
                color: white;
              }
              a:link {
                text-decoration: none;
                color: white;
              }
              a:hover {
                color: white;
              }
              .card-columns {
                column-count: 3;
              }
              .examCode {
                width: 560px;
            }
            `}
          </style>
        </div>
      );
    } else {
      return <h5><br></br>No Examinations Found</h5>;
    }
  }
  return <h5><br></br> No Examinations Found</h5>;
};

const query = gql`
  query {
    examinations {
      id
      name
      description
      code
      private
      startTime
      endTime
    }
  }
`;
ExaminationList.getInitialProps = async () => {
  const res = await fetch("https://api.github.com/repos/zeit/next.js");
  const json = await res.json();
  return { stars: json.stargazers_count };
};
// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (ExaminationList)
export default graphql(query, {
  props: ({ data }) => ({
    data
  })
})(ExaminationList);