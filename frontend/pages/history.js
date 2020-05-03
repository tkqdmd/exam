/* /pages/examinations.js */

import gql from "graphql-tag";
import {withRouter} from "next/router";
import {graphql} from "react-apollo";
import {compose} from "recompose";
import React from 'react';
import securePage from "../hocs/securePage";
import {Table} from "reactstrap";

class History extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}

    }

    render() {
        const {
            data: {loading, error, results},
            router,
            context,
            isAuthenticated,
        } = this.props;
        if (error) return "Error Loading Questions";

        if (results) {

            return (
                <Table>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Exam Code</th>
                        <th>Point</th>
                        <th>Time</th>
                    </tr>
                    </thead>
                    <tbody>
                    {results.filter(re => (
                        re.email === this.props.loggedUser
                    )).map(result => (
                        <tr>
                            <th scope="row">1</th>
                            <td>{result.examCode}</td>
                            <td>{result.point.toFixed(2)}</td>
                            <td>{result.datetime}</td>
                        </tr>
                    ))
                    }
                    </tbody>
                </Table>
            );
        }
        return <h1><br></br>You have never done any exam</h1>;
    }
}

const GET_RESULTS = gql`
    query {
        results {
            id
            email
            examCode
            point
            datetime
        }
    }
`;
// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (ExaminationList)

export default compose(
    withRouter,
    securePage,
    graphql(GET_RESULTS, {
        props: ({data}) => ({data})
    }),
)(History);