import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Message } from 'semantic-ui-react';
import CSVReader from './CSVReader';
import SearchTable from './SearchableTable';

class ListLambdaTable extends Component {

    render() {
        return (
            <Container textAlign='center'>
                { !_.isEmpty(this.props.matrix) ? <SearchTable Headers={this.props.headers} Matrix={this.props.matrix} /> : !this.props.error ? <Message info header = "List Lambdas functions Generator - Upload a csv to start"/> : null }
                {this.props.error ? <Message negative header="Oops!" content={this.props.error} /> : null }
            </Container>
        );
    }
}

const mapStateToProps = state => {
    var { headers, matrix, error } = state.LambdaListTable;
    return { headers, matrix, error };
}

export default connect(mapStateToProps)(ListLambdaTable);