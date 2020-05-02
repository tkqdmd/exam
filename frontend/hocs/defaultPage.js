/* hocs/defaultPage.js */

import React from "react";
import Router from "next/router";

import {
    getEmailFromServerCookie,
    getUserFromLocalCookie,
    getUserFromServerCookie,
    getUsernameFromLocalCookie
} from "../lib/auth";

export default Page =>
    class DefaultPage extends React.Component {
        static async getInitialProps({req}) {
            const loggedUser = process.browser
                ? getUserFromLocalCookie()
                : getEmailFromServerCookie(req);
            const loggedUsername = process.browser
                ? getUsernameFromLocalCookie()
                : getUserFromServerCookie(req);
            const pageProps = Page.getInitialProps && Page.getInitialProps(req);
            let path = req ? req.pathname : "";
            path = "";
            return {
                ...pageProps,
                loggedUser,
                loggedUsername,
                currentUrl: path,
                isAuthenticated: !!loggedUser
            };
        }

        logout = eve => {
            if (eve.key === "logout") {
                Router.push(`/?logout=${eve.newValue}`);
            }
        };

        componentDidMount() {
            window.addEventListener("storage", this.logout, false);
        }

        componentWillUnmount() {
            window.removeEventListener("storage", this.logout, false);
        }

        render() {
            return <Page {...this.props} />;
        }
    };