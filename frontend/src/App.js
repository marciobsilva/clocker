import React from 'react';
import Routes from './routes';
import Header from './components/Header/';
import './App.css';

const { Container } = require('./components/styles');

export default function App() {
  return (
    <div>
      <Header />
      <Container>
        <Routes />
      </Container>
    </div>
  );
}
