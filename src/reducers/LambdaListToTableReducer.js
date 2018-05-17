import _ from 'lodash';
import {
    LAMBDA_LIST_FILE_UPLOAD,
    LAMBDA_LIST_FILE_ERROR,
  } from '../actions/types';

  const INITIAL_STATE = {
    error: null,
    headers: [],
    matrix: {},
  };
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case LAMBDA_LIST_FILE_UPLOAD:
          var { headers, matrix, error } = action.payload;
          matrix = _.map(matrix, (arr, index) => {
              return _.zipObject(headers, arr);
          });
          return { ...INITIAL_STATE, headers, matrix }
      case LAMBDA_LIST_FILE_ERROR:
        return { ...INITIAL_STATE , error: "Failed to Parse CSV." }
      default:
        return state;
    }
  };