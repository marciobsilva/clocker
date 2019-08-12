import React, { Component } from 'react';
const api = require('../services/api');
const { Table } = require('./styles');

export default class ListaDiscursos extends Component {
  state = {
    discursos: []
  };

  componentDidMount = async event => {
    const { data } = await api.get('/speeches');
    this.setState({discursos: data});
  };

  startSpeech = idSpeech => {
    console.log(idSpeech);
  };

  render() {

    const discursosTr = this.state.discursos.map( discurso => {
        return (
            <tr key={discurso.id}>
                <td>{ discurso.title }</td>
                <td>{ discurso.time }</td>
                <td><button onClick={ this.startSpeech(discurso.id) }>Iniciar</button></td>
            </tr>
        );
    });

    return (
        <Table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Tempo (Minutos)</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
                { discursosTr }
            </tbody>
        </Table>
    );
  }
}
