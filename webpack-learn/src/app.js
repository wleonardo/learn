import React from 'react';
import {
    render
} from 'react-dom';
import {
    Provider
} from 'react-redux';
import {
    createStore,
    applyMiddleware
} from 'redux';
import todoApp from './reducers/main';
import App from './scripts/index';

const tm = ({
    getState,
    dispatch
}) => next => (action) => {
    action.text = action.text + 'hahaha';
    next(action);
    console.log(123);
}

let store = createStore(todoApp, applyMiddleware(tm));


render(
    <Provider store={store}>
    <App />
  </Provider>,
    document.getElementById('app')
)

// function compose(...funcs) {
//     if (funcs.length === 0) {
//         return arg => arg
//     }
//
//     if (funcs.length === 1) {
//         return funcs[0]
//     }
//
//     return funcs.reduce(function(a, b) {
//         console.log(a);
//         console.log(b);
//         return function() {
//             return a(b.apply(undefined, arguments));
//         };
//     });
// }
//
// compose(() => {
//     console.log(1);
// }, () => {
//     console.log(2);
// }, () => {
//     console.log(3);
// })();
