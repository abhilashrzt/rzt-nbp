import * as React from 'react';
import {Loader, NotificationBar, Popup} from '../../pages/Global/Global';
import TransitionGroup from 'react-addons-transition-group';
import {connect} from 'react-redux';
import {actionHideNotificationBar} from '../../pages/Global/Global.actions'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.props.hideNotificationBar.bind(this);
    }

    render() {
        let notification = '';
        let {header, main, loader, errorPopup} = this.props;
        if (this.props.notification.visible)
            notification = <NotificationBar data={this.props.notification}
                                            hideNotificationBar={this.props.hideNotificationBar}/>
        return (
            <TransitionGroup component="div">
                <div style={ loader > 0 ? { filter:'blur(2px)' } : {}}>
                { header }
                { main }
                </div>
                { ( loader != 0 ) && <Loader/> }
                { notification }
                { errorPopup.visible && <Popup msg={errorPopup.msg} onSave={errorPopup.onSave} onCancel={errorPopup.onCancel}>
                  <span>You have unsaved changes. <br/> Do you wish to continue without saving ?</span>
                </Popup> }

            </TransitionGroup>
        );

    }
}


const mapToProps = (state) => {
    console.log("state :",state)
    /*TODO: divide the customers data so that they can be easily passed to the components*/
    return ({
        loader: state.global.loader.count,
        notification: state.global.notification,
        errorPopup: state.global.errorPopup
    })
}, dispatcher = (dispatch) => ({
    hideNotificationBar: () => {
        dispatch(actionHideNotificationBar({isClosed: true}))
    }
});

export default connect(mapToProps, dispatcher)(App);