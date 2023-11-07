import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

// This default export is required in a new `pages/_app.js` file.
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

App.propTypes = {
  Component: PropTypes.object,
  pageProps: PropTypes.object,
};
