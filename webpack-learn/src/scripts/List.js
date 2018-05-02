import React from 'react';
import {
    connect
} from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

let list = ({
    dispatch,
    todos
}) => {
    return (
        <div>
          {_.map(todos, (d) => {
            return (
              <a key={d.id}>{d.text}</a>
            )
          })}
        </div>
    )
};

list.propTypes = {}

const mapStateToProps = state => {
    return {
        todos: state.todos
    }
};

list = connect(
    mapStateToProps
)(list)

export default list;
