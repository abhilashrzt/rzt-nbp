import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './CustomerPropensity.css';

import List from './../List/List';
/*TODO: Remove this unused component*/
const CustomerPropensity = () => {
  return(
    <div>
      <List></List>
      <List></List>
    </div>
  )
}

export default CSSModules(styles, CustomerPropensity, {allowMultiple : true});