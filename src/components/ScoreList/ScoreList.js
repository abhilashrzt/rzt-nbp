import React from 'react';
import classNames from 'classnames';
import CSSModules from 'react-css-modules';
import styles from './ScoreList.css';

const ScoreList = ({listData,getFieldColor}) => (
    <ul styleName="list">
        { listData && listData.map((item, index) => {


            let value = item.value == null ? '--' : Number(item.value || 0)

            return (
                <li styleName="list__item"
                        style={{borderRightColor: getFieldColor(item.value, item.label)}}
                        key={index}>
                    <span styleName="list__item__title"
                          title={item.label}>
                        {item.label}
                    </span>
                    <span styleName="list__item__subTitle"
                          title={value + '%'}>
                        {value + '%'}
                    </span>
                </li>
            )
        })}
    </ul>
)

export default CSSModules(ScoreList, styles, {allowMultiple: true});