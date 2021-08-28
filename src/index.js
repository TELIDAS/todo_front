import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import {Provider} from "react-redux";
import {createBrowserHistory} from "history";
import {ConnectedRouter, connectRouter, routerMiddleware} from "connected-react-router";
import { todoReducer } from "./store/reducers/todoReducers";
import { userReducer } from './store/reducers/userReducer';
import {BrowserRouter} from "react-router-dom";

const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
    router: connectRouter(history),
    todo: todoReducer,
    user: userReducer
});

const middleware = [
    thunkMiddleware,
    routerMiddleware(history)
];

const enhancers = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(rootReducer, enhancers);

const app = (
    <Provider store={store}>
            <ConnectedRouter history={history}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </ConnectedRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));