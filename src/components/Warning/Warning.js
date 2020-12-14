import * as React from "react";
import CSSModules from 'react-css-modules';
import styles from './Warning.css';

const Warning = ({text}) => (
  <div styleName="info">{text}</div>
);

export default CSSModules(Warning, styles, {allowMultiple: true});