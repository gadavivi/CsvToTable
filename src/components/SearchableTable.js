import _ from 'lodash';
import React, { Component } from "react";
import { Container, Table, Input, Pagination } from 'semantic-ui-react';

class SearchTable extends Component {
    constructor(props) {
        super(props);

        const pageSize = props.pageSize ? props.pageSize : 10;

        this.state = {
            column: null,
            currentdisplay: props.Matrix.slice(0, pageSize),
            searchResult: props.Matrix,
            direction: null,
            searchTerm: '',
            isLoading: false,
            activePage: 1,
            pageSize: pageSize
        }
    }

    handleSort = clickedColumn => () => {
        this.setState({ isLoading: true});
        const { column, currentdisplay, direction, activePage } = this.state;
        let { searchResult } = this.state;
        if (column !== clickedColumn) {
            searchResult = _.sortByOrder(searchResult, [clickedColumn]);
            this.setState({
                column: clickedColumn,
                currentdisplay: searchResult.slice(this.state.pageSize * (activePage - 1), this.state.pageSize * activePage),
                searchResult: searchResult,
                direction: 'ascending',
                isLoading: false
            })

            return
        }

        searchResult = searchResult.reverse();
        this.setState({
            searchResult,
            currentdisplay: searchResult.slice(this.state.pageSize * (activePage - 1), this.state.pageSize * activePage),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
            isLoading: false
        })
    }
    generateHeaders(headers) {
        const { column, direction } = this.state
        return _.map(headers, (value, index) => {
            return (<Table.HeaderCell key={index.toString()} sorted={column === value ? direction : null} onClick={this.handleSort(value)}>
                {value}
            </Table.HeaderCell>);
        })
    }
    generateRows(matrix) {
        return _.map(matrix, (row, index) => {
            return (<Table.Row key={index.toString()} >
                {
                    _.map(row, (value, item) => {
                        return (<Table.Cell key={item}>{value}</Table.Cell>);
                    })
                }
            </Table.Row>)
        })
    }

    handleSearchChange = (event) => {
        this.setState({ isLoading: true, searchTerm: event.target.value });
        const { direction, column } = this.state;
        let searchResult;
        setTimeout(() => {
            if (this.state.searchTerm.length < 1) {
                searchResult = column ? _.sortByOrder(this.props.Matrix, [column], [direction === 'ascending' ? 'asc' : 'desc']) : this.props.Matrix;
                this.setState({ isLoading: false , searchResult, currentdisplay: searchResult.slice(0, this.state.pageSize), activePage: 1 })
                return;
            }
            const re = new RegExp(_.escapeRegExp(this.state.searchTerm), 'i')
            searchResult = _.filter(this.props.Matrix, row => {
                {
                    for (var key in row) {
                        if (re.test(row[key])) {
                            return true;
                        }
                    }
                    return false;
                }
            })
            searchResult = column ? _.sortByOrder(searchResult, [column], [direction === 'ascending' ? 'asc' : 'desc']) : searchResult;

            this.setState({
                isLoading: false,
                currentdisplay: searchResult.slice(0, this.state.pageSize),
                searchResult,
                activePage: 1
            })
        }, 300)
    }
    handleOnPageChange(event, data) {        
        const { searchResult } = this.state;
        const { activePage } = data;
        this.setState({currentdisplay: searchResult.slice(this.state.pageSize * (activePage - 1), this.state.pageSize * activePage), activePage})
    }

    componentWillReceiveProps(props){
        const pageSize = props.pageSize ? props.pageSize : 10;

        this.setState({
            column: null,
            currentdisplay: props.Matrix.slice(0, pageSize),
            searchResult: props.Matrix,
            direction: null,
            searchTerm: '',
            isLoading: false,
            activePage: 1,
            pageSize: pageSize
        })
    }

    render() {
        const headers = this.props.Headers;
        const { currentdisplay, searchTerm, isLoading, searchResult, activePage } = this.state;
        return (
            <Container>
                <Input
                    loading={isLoading}
                    onChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                    value={searchTerm}
                    icon={{ name: 'search', circular: true, link: true }}
                    placeholder='Search...'
                />
                <Table sortable celled>
                    <Table.Header>
                        <Table.Row>
                            {
                                this.generateHeaders(headers)
                            }
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            this.generateRows(currentdisplay)
                        }
                    </Table.Body>
                </Table>
                <Pagination activePage={this.state.activePage} 
                    totalPages={ Math.ceil(searchResult.length / this.state.pageSize) }
                    onPageChange={this.handleOnPageChange.bind(this)} 
                    />
            </Container>);
    }
}

export default SearchTable;