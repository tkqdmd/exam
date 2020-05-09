/* components/hocs/securePage.js */

import React from "react";
import PropTypes from "prop-types";
import defaultPage from "./defaultPage";
import Router from "next/router";

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
      if (!isAuthenticated) { 
        Router.ready(() => Router.push('/signin'))
        return "";
      }
      return <Page {...this.props} />;  
    }
  };

export default Page => defaultPage(securePageHoc(Page));