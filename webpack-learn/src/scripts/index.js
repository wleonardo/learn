import React from 'react'
import PropTypes from 'prop-types'
import InputComponent from './InputComponent.js';
import List from './List.js';

const Index = (dispatch) => {
    return (
        <div>
          <InputComponent></InputComponent>
          <List></List>
        </div>
    )
};

Index.propTypes = {}

export default Index;
