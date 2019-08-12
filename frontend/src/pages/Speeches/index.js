import React, { Component } from 'react';
import './index.css';

const api = require('../../services/api');

export default class ListaDiscursos extends Component {
  state = {
    discursos: [],
    startedSpeech: {},
    buttonStartDisabled: false
  };

  componentDidMount = async e => {
    const { data } = await api.get('/speeches');
    const { speeches, lastCommand } = data;

    this.setState({discursos: speeches});

    if(lastCommand.method === "start"){
      this.setState({buttonStartDisabled: true});
      this.setState({startedSpeech: lastCommand});
    }
  };

  startSpeech = async idSpeech => {
    const { data } = await api.get(`/speeches/start?id=${idSpeech}`);
    if(!!data.msg) alert(data.msg);
    else {
      this.setState({buttonStartDisabled: true});
      this.setState({startedSpeech: data});
    };
  };

  render() {

    const discursosTr = this.state.discursos.map( discurso => {
        return (
            <tr key={discurso.id}>
                <td>{ discurso.title }</td>
                <td>{ discurso.time }</td>
                <td>
                  <button 
                    className="startSpeech" 
                    onClick={ () => this.startSpeech(discurso.id) } 
                    disabled={ this.state.buttonStartDisabled }
                  > Iniciar </button>
                </td>
            </tr>
        );
    });

    return (
      <div className="container">
        <div className="list-speeches-container">
          <table>
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
          </table>
        </div>

        <footer>
          00:00
        </footer>
      </div>
    );
  }
}
