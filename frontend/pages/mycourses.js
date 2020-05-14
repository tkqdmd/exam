/* /pages/examinations.js */

import gql from "graphql-tag";
import {withRouter} from "next/router";
import {graphql} from "react-apollo";
import {compose} from "recompose";
import React from 'react';
import Link from "next/link";
import securePage from "../hocs/securePage";
import {Card, CardBody, CardText, CardTitle,} from "reactstrap";

class MyCourse extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}

    }

    render() {
        const {
            data: {loading, error, courses},
            router,
            context,
            isAuthenticated,
        } = this.props;
        if (error) return "Error Loading Courses";

        if (courses) {
            const myCourses = courses.filter(c => (
                c.students.students.indexOf(this.props.loggedUser) != -1
            ))

            return (
                <div className="h-100">
                    <h2 style={{margin: "30px"}}>My Courses</h2>
                    {myCourses.map(res => (

                        <Card
                            outline color="primary"
                            style={{width: "100%", margin: "0 10px 20px"}}
                            className="h-100"
                            key={res.id}
                        >

                            <CardBody>
                                <CardTitle><h5>{res.name}</h5></CardTitle>
                                <CardText>{res.description}</CardText>
                            </CardBody>
                            <div className="card-footer">
                                <Link
                                    as={`/courses/${res.id}`}
                                    href={`/courses?id=${res.id}`}
                                >
                                    <a className="btn btn-primary">View Course</a>
                                </Link>
                            </div>
                        </Card>
                    ))}
                </div>
            );
        }
        return <h1><br></br>You don't have any course</h1>;
    }
}

const GET_COURSES = gql`
    query {
        courses {
            id
            name
            description
            teachername
            teacheremail
            students
        }
    }
`;
// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (ExaminationList)

export default compose(
    withRouter,
    securePage,
    graphql(GET_COURSES, {
        props: ({data}) => ({data})
    }),
)(MyCourse);