import * as React from "react";
import CSSModules from 'react-css-modules';
import styles from './ContextMenu.css';

const ContextMenu = ({items, inlineStyles , position, onclick}) => (
  <div styleName="menu" style={{'left' : position[0],'top': position[1]}}>
    <ul>
      {items.map( (item, i) => <li key={i} onClick={() => onclick(item)}>{item}</li>)}
    </ul>
  </div>
);

export default CSSModules(ContextMenu, styles, {allowMultiple: true});