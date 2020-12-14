import React from 'react';
import classNames from 'classnames';
import CSSModules from 'react-css-modules';
import styles from './BulletList.css';

const BulletList = ({listData})=> (
    <ul styleName="list">
        {listData && listData.map((item, index) => {
            return <li styleName="list__item" key={index}>{item}</li>
        })}
    </ul>
)

export default CSSModules(BulletList, styles, {allowMultiple: true});