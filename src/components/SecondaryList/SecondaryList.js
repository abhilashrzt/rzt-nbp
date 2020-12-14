import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './SecondaryList.css';

@CSSModules(styles, {allowMultiple: true})
export default class SecondaryList extends React.Component {
    render() {
        let {listData} = this.props;
        return <div styleName="secondary-list">
            <h4 styleName="secondary-list__header">
                {listData.label}
            </h4>
            <ul styleName="secondary-list__container">
                {
                    listData.values.map((data, index) => {
                        return <li styleName="secondary-list__container__item"
                                   className="clearfix"
                                   key={index}>
                            <span styleName="secondary-list__container__item__title" className="fleft">{data.label}</span>
                            <span styleName="secondary-list__container__item__title-value" className="fright">{data.value}</span>
                        </li>
                    })
                }
            </ul>
        </div>
    }
}