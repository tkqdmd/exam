/* /pages/examinations.js */

import gql from "graphql-tag";
import {withRouter} from "next/router";
import {graphql} from "react-apollo";
import {compose} from "recompose";
import React from 'react';
import securePage from "../hocs/securePage";
import {Button, Card, CardBody, CardText, CardTitle,} from "reactstrap";

class Courses extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const {
            data: {loading, error, course},
            router,
            context,
            isAuthenticated,
        } = this.props;
        if (error) return "Error Loading Examinations";

        if (course) {

            return (
                <div className="h-100">
                    <div style={{margin: "30px"}}>
                        <h2>{course.name}</h2>
                        <h6>{course.description}</h6>
                    </div>

                    {course.examinations.map(res => (

                        <Card
                            outline
                            color={new Date() < new Date(res.startTime) || new Date() > new Date(res.endTime) ? "danger" : "primary"}
                            style={{width: "100%", margin: "0 10px 20px"}}
                            className="h-100"
                            key={res.id}
                        >
                            <CardBody>
                                <CardTitle><h5>{res.name}</h5></CardTitle>
                                <CardText>{res.description}</CardText>
                                <CardText style={{fontSize: "12px", margin: "0px"}}><i>Open
                                    at: {res.startTime}</i></CardText>
                                <CardText style={{fontSize: "12px", margin: "0px"}}><i>Close
                                    at: {res.endTime}</i></CardText>
                            </CardBody>
                            <div className="card-footer">
                                <Button
                                    as={`/examinations/${res.id}`}
                                    href={`/examinations?id=${res.id}`}
                                    disabled={new Date() < new Date(res.startTime) || new Date() > new Date(res.endTime)}
                                    color={new Date() < new Date(res.startTime) || new Date() > new Date(res.endTime) ? "danger" : "primary"}
                                >
                                    {new Date() < new Date(res.startTime) || new Date() > new Date(res.endTime) ? "Can't start exam" : "Start Exam"}
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            );
        }
        return <h1><br></br>You have never done any exam</h1>;
    }
}

const GET_COURSE_EXAMINATIONS = gql`
    query($id: ID!) {
        course(id: $id) {
            id
            name
            description
            examinations {
                id
                name
                description
                startTime
                endTime
            }
        }

    }
`;
// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (ExaminationList)

export default compose(
    withRouter,
    securePage,
    graphql(GET_COURSE_EXAMINATIONS, {
        options: props => {
            return {
                variables: {
                    id: props.router.query.id
                }
            };
        },
        props: ({data}) => ({data})
    }),
)(Courses);