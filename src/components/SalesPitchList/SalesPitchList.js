import React from 'react';
import classNames from 'classnames';
import CSSModules from 'react-css-modules';
import styles from './SalesPitchList.css';

@CSSModules(styles, {allowMultiple: true})
export default class SalesPitchList extends React.Component{
    static propTypes = {
        list: React.PropTypes.array
    }
    static defaultProps = {
        list: [],
        title: ''
    }
    render(){
        let { title, list }=this.props;
        return (
        <div styleName="list-wrapper">
        <header styleName="header">
            <span styleName="header__title">{title}</span>
        </header>
            { list.length ? <ul styleName="list">
                    {  list.map((listData,i) => <li key={i} styleName="list__item">{listData} </li>) } </ul>
                : <span styleName="emptyData"> NO REASONS FOUND </span> }
        </div>);
    }

}