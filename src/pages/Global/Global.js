import * as React from "react";
import CSSModules from "react-css-modules";
import styles from './Global.css';
import Button from './../../components/Button/Button';

class loader extends React.Component {

    render() {
        console.log('In loader');
        return (
            <div styleName="wrapper">
                {/*<div styleName="loader__spinner"/>*/}
                {/*<h5 styleName="loader__title">Loading...</h5>*/}
                <ul styleName="loader">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        );
    }
};

class popup extends React.Component {
    render(){
        let { msg , children, onSave, onCancel } = this.props;
        return (<div styleName="popup-overlay">
            <div styleName="popup warning">
                <div styleName="popup__head">
                    <span className="flaticon-caution-sign" styleName="popup-warning-ico"/>
                    <span styleName="popup__head__text">WARNING</span>
                    <span styleName="close-ico" className="flaticon-close" onClick={onCancel}/>
                </div>
                <div styleName="popup__body">
                    <span styleName="popup__body__text"> { msg || children } </span>
                    <div styleName="popup__body-btn-wrapper">
                        <Button
                          className={{ global: 'primary-btn' }}
                          text="YES" customStyle={styles['popup__body-btn']}
                          onClick={onSave}/>
                        <Button
                          className={{ global: 'primary-btn' }}
                          text="NO" customStyle={styles['popup__body-btn']}
                          onClick={onCancel}/>
                    </div>
                </div>
            </div>
        </div>)
    }
}

class notificationBar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let {data, hideNotificationBar} =  this.props;
        return ( <div styleName={`notification-bar ${(data.type) || ''}`}>
            <span styleName="notification-bar__msg">{data.msg}</span>
            { data.discardable && <button styleName="notification-bar__close-btn"
                                          onClick={() => {
                                              console.log("closed");
                                              hideNotificationBar();
                                          }}>
                <span>+</span>
            </button>}
        </div>)
    }
}


export const Loader = CSSModules(loader, styles, {allowMultiple: true});
export const NotificationBar = CSSModules(notificationBar, styles, {allowMultiple: true});
export const Popup = CSSModules(popup, styles, {allowMultiple: true});