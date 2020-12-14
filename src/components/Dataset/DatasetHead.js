import * as React from "react";
import CSSModules from 'react-css-modules';
import styles from './Dataset.css';
import Button from './../../components/Button/Button'
import {TweenMax} from 'gsap';
import classNames from 'classnames';
import Tooltip from './../../components/Tooltip/Tooltip';

@CSSModules(styles, {allowMultiple: true})
class DatasetHeadField extends  React.Component {
    constructor(props){
        super(props);
        this.state = {
            tooltip: false
        }
    }

    toggleTooltip = (action) => {
        this.setState({
            tooltip : action
        })
    }

    render(){
        let { field, getFieldColor } = this.props;
        let { tooltip } = this.state;
        return (<li styleName="title-list__item" style={field.styles}>
            <span styleName="title-list__title">{field.title} { field.iconClass && <span className={classNames("tooltip", "onleft")} styleName="headLabel" data-tooltip={field.tooltip}><span className={field.iconClass} styleName="headLabelIcon"></span></span> }</span>
            <span styleName="title-list__sub-title" title={field.value} onMouseOver={ () => this.toggleTooltip(true) }
                  onMouseOut={ () => this.toggleTooltip(false) }
                  style={ getFieldColor && getFieldColor[field.title] == null ? { color: '#000'} : { color : getFieldColor[field.title] }}>{field.value}</span>
            { false && tooltip && <Tooltip head={field.title} text={field.desc} />}
        </li>);
    }
}

@CSSModules(styles, {allowMultiple: true})
export default class DatasetHead extends React.Component {

    render() {
        let {fields, onClick, id, deleteAction, headTitle, deletable, page, parent, getFieldColor} = this.props;""
        return <div styleName="header" onClick={onClick}>
            <ul styleName="title-list">
                { fields.map((field, i) => <DatasetHeadField key={`index${i}field${id}`} field={field}
                                                             getFieldColor={ getFieldColor }/> ) }

                { !(page == 'customers' || page == 'analyse') && <li styleName='title-list__item action-col'>
                    { deletable && <Button
                        className={{
                            local: 'title-list__action-button',
                            global: 'flaticon-rubbish-bin fleft'
                        }}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            this.props.togglePopup({
                                msg: "Are you sure you want to delete?",
                                onSave: () => {
                                    this.props.togglePopup();
                                    deleteAction({dataset_id: id, type: 'delete'})
                                },
                                onCancel: () => {
                                    this.props.togglePopup();
                                }
                            });
                        }}
                    /> }
                    <Button className={{
                        local: 'title-list__action-button',
                        global: 'flaticon-menu fleft'
                    }}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                console.log("menu action");
                            }}
                    />
                </li>}

            </ul>
        </div>
    }
}