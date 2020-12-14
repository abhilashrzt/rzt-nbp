import * as React from "react";
import CSSModules from 'react-css-modules';
import styles from './Button.css';
import classNames from 'classnames';

const Button = ({text, className, children, onClick, disabled, customStyle}) => (
  <button styleName={className.local}
          className={classNames(className.global, customStyle)}
          disabled={disabled? "disabled": ''}
          onClick={onClick}>{text}{children}</button>
);

export default CSSModules(Button, styles, {allowMultiple: true});