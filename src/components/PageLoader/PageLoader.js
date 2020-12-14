import * as React from "react";
import CSSModules from "react-css-modules";
import styles from './PageLoader.css';


const PageLoader = () => (
  <div styleName="loader">
      {/*<div styleName="loader__spinner"/>*/}
      <h5 styleName="loader__title">Loading...</h5>
  </div>
);

export default CSSModules(PageLoader, styles, {allowMultiple: true});