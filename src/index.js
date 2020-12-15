import * as React from "react";
import { render } from "react-dom";
import { browserHistory, Router } from 'react-router';
import { Provider} from "react-redux";
import { syncHistoryWithStore } from 'react-router-redux';

import './fonts/flaticon/flaticon.css';
import './global.css';

import configureStore from './store';
import App from './containers/App/app'
import createRoutes from './routes';

export const store = configureStore(browserHistory);

const rootRoute = {
    childRoutes: [{
        path: '/',
        component: App,
        indexRoute: {onEnter: (nextState, replace)=> { replace("/datasets"); }},
        childRoutes: createRoutes(store)
    } ]
}


const history = syncHistoryWithStore(browserHistory, store);

render(
    <Provider store={store}>
        <Router history={browserHistory}
                routes={rootRoute}>
        </Router>
    </Provider>,
    document.getElementById('root')
);