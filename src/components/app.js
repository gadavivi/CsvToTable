import React, { Component } from 'react';
import ListLambdaUpload from './ListLambdaUpload';
import ListLambdaTable from './ListLambdaTable';
import { Container, Header } from 'semantic-ui-react';

export default class App extends Component {
  render() {
    return (
      <Container textAlign='center'>
        <Header size='huge'>Epsagon</Header>
        <ListLambdaUpload />
        <ListLambdaTable />
      </Container>
    );
  }
}
