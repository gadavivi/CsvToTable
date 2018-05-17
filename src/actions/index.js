import {
    LAMBDA_LIST_FILE_UPLOAD,
    LAMBDA_LIST_FILE_ERROR,
} from './types';

const validateCsv = (matrix, headers) => {
    while (matrix[matrix.length - 1][0] === null) {
        matrix.pop();
    }
    for (var i = 0; i < matrix.length; i++) {
        if (matrix[i].length !== headers.length)
            return false;
    }
    return true;
}
export const lambda_list_to_table = (matrix) => {
    if (matrix.length === 0) {
        return {
            type: LAMBDA_LIST_FILE_ERROR
        };
    }

    const headers = matrix[0]
    matrix.shift();
    if (validateCsv(matrix, headers)) {
        return {
            type: LAMBDA_LIST_FILE_UPLOAD,
            payload: { headers, matrix }
        };
    }
    else {
        return {
            type: LAMBDA_LIST_FILE_ERROR
        };
    }
};