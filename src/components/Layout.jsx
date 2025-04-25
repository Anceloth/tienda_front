import React from "react";
import Header from "./Header";
import Footer from "./Footer.jsx";
import PropTypes from "prop-types";


const Layout = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

export default Layout;

Layout.propTypes = {
  children: PropTypes.any.isRequired,
};