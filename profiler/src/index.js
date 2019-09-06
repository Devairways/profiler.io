import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './container/App';
import 'tachyons';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { updateProfile, getUser } from './reducers'

const rootReducers = combineReducers({ updateProfile, getUser})

const store = createStore(rootReducers, applyMiddleware(thunkMiddleware))


ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
