/* /components/Layout.js */

import React from "react";
import Head from "next/head";
import Link from "next/link";
import {unsetToken} from "../lib/auth";
import {Container, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, UncontrolledDropdown} from "reactstrap";
import defaultPage from "../hocs/defaultPage";


class Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  static async getInitialProps({req}) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps, isAuthenticated };
  }
  render() {
    const { isAuthenticated, children } = this.props;
    const title = "Examination";
    return (
      <div>
        <Head>
          <title>{title}</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
            integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
            crossOrigin="anonymous"
          />
          <script src="https://js.stripe.com/v3" />
        </Head>
        <header>
          <Nav className="navbar navbar-dark bg-dark">
            <NavItem>
              <Link href="/">
                <a className="navbar-brand">Examination</a>
              </Link>
            </NavItem>
            {isAuthenticated ? (
              <>

                <NavItem className="ml-auto">
                  <UncontrolledDropdown style={{marginRight: 30}}>
                    <DropdownToggle caret>
                      {this.props.loggedUsername}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>
                        <a style={{color: "black"}} href="/history">
                          History test
                        </a>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </NavItem>
                <NavItem>
                  <Link href="/">
                    <a className="logout" onClick={unsetToken}>
                      Logout
                    </a>
                  </Link>
                </NavItem>
              </>
            ) : (
              <>
                <NavItem className="ml-auto">
                  <Link href="/signin">
                    <a className="nav-link">Sign In</a>
                  </Link>
                </NavItem>

                <NavItem>
                  <Link href="/signup">
                    <a className="nav-link"> Sign Up</a>
                  </Link>
                </NavItem>
              </>
            )}
          </Nav>
        </header>
        <Container>{children}</Container>
        {/*<footer className="footer">*/}
        {/*  {"Powered by Strapi & ReactJS"}*/}
        {/*  <style jsx>*/}
        {/*    {`*/}
        {/*      .footer {*/}
        {/*        bottom: 0;*/}
        {/*        width: 100%;*/}
        {/*        height: 60px;*/}
        {/*        line-height: 60px;*/}
        {/*        background-color: #f5f5f5;*/}
        {/*      }*/}
        {/*      a:hover {*/}
        {/*        cursor: pointer;*/}
        {/*        color: yellow;*/}
        {/*      }*/}
        {/*    `}*/}
        {/*  </style>*/}
        {/*</footer>*/}
      </div>
    );
  }
}

export default defaultPage(Layout);