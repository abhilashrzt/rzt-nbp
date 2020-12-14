import * as React from "react";
import CSSModules from 'react-css-modules';
import styles from './Tooltip.css';
import classNames from 'classnames';

const Tooltip = ({ head, text = "Lorem Ipsum si simplye dummy text of the printig and typesetting", position }) => (
    <div styleName="tooltip">
        { head && <h3 styleName="head">{ head }</h3> }
        <p styleName="body">{ text }</p>
    </div>
);

export default CSSModules( Tooltip, styles, { allowMultiple : true });
