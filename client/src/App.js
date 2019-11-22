import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import Routes from '../src/routes/index'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include'
});

function App() {

  return (
    <ApolloProvider client={client}>
      <Routes />      
    </ApolloProvider >
  );
}

export default App;
