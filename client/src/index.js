import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import rootReducer from './redux/reducers';
import * as serviceWorker from './serviceWorker';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>

                <Route exact path='/' component={App} />

            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));

serviceWorker.unregister();
