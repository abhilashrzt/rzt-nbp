import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './ProgressBar.css';

const ProgressBar = ({ value, thumbColor }) => (
    <div styleName="wrapper">
        <div styleName="track">
            <span styleName="thumb" style={{ background: thumbColor, width: value + '%'}}></span>
        </div>
        <span styleName="text">{value + '%'}</span>
    </div>
)

export default CSSModules(ProgressBar, styles, {allowMultiple : true});