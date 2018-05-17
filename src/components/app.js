import React, { Component } from 'react';
import ListLambdaUpload from './ListLambdaUpload';
import { Container } from 'semantic-ui-react';

export default class App extends Component {
  render() {
    return (
      <Container textAlign='center'>
        <ListLambdaUpload />
      </Container>
    );
  }
}
