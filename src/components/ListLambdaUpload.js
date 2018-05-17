import React, { Component } from 'react';
import { connect } from 'react-redux';
import CSVReader from './CSVReader';
import { lambda_list_to_table } from '../actions'

class ListLambdaUpload extends Component {

    render() {

        return (
                <CSVReader
                    onFileLoaded={this.props.lambda_list_to_table}
                    onError={(this.props.lambda_list_to_table)}
                />
        );
    }
}

export default connect(null, { lambda_list_to_table })(ListLambdaUpload);