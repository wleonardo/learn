import React from 'react';
import {
    connect
} from 'react-redux';
import PropTypes from 'prop-types';
import {
    addTodo
} from '../actions/index.js';

let component = ({
    dispatch
}) => {
    return (
        <div>
          <input type="text" onChange={(e) => {
            dispatch(addTodo(e.target.value))
          }}/>
        </div>
    )
};

component.propTypes = {}

component = connect()(component)

export default component;
