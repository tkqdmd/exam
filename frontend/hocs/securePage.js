/* components/hocs/securePage.js */

import React from "react";
import PropTypes from "prop-types";
import defaultPage from "./defaultPage";
import {Button} from "reactstrap";

const securePageHoc = Page =>
  class SecurePage extends React.Component {
    static propTypes = {
      isAuthenticated: PropTypes.bool.isRequired
    };

    static getInitialProps(ctx) {
      return Page.getInitialProps && Page.getInitialProps(ctx);
    }

    render() {
      const { isAuthenticated } = this.props;
      return isAuthenticated ? <Page {...this.props} /> : 
        <div> 
        <br></br>You must login before
        <br></br>
        <a href="/signin"><Button color="primary">Login</Button></a>
        </div>;
    }
  };

export default Page => defaultPage(securePageHoc(Page));