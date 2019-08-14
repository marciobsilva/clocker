import React, { Component } from 'react';
import Header from '../../components/Header';
import './index.css';

const api = require('../../services/api');

export default class ListaDiscursos extends Component {
  state = {
    discursos: [],
    startedSpeech: {},
    buttonStartDisabled: false,
    seconds: 0,
    textCronometer: "00:00",
    classFooter: "footer-white",
    running: false,
    socket: null,
  };

  colorVerify = () => {
    if(((this.state.startedSpeech.speech.time * 60) - this.state.seconds) <= 60){
      if(((this.state.startedSpeech.speech.time * 60) - this.state.seconds) < 0) this.setState({classFooter: "footer-red"});
      else {
        if((this.state.seconds % 2) === 0) this.setState({classFooter: "footer-red"});
        else this.setState({classFooter: "footer-black"});
      }
    }
  }

  formatMinutes = () => {
    const minutes = Math.floor(this.state.seconds / 60);
    if(minutes.toString().length === 1) return `0${minutes}`;
    else return minutes;
  }

  runClocker = () => {
    this.formatMinutes();
    setInterval(() => {
      if(this.state.running){
          this.setState({seconds: this.state.seconds + 1});
          this.setState({textCronometer: `${this.formatMinutes()}:${("0" + (this.state.seconds % 60)).slice(-2)}`});
          this.colorVerify();
      }
    }, 1000);
  };

  componentDidMount = async e => {
    this.runClocker();

    const { data } = await api.get('/speeches');
    const { speeches, lastCommand } = data;

    this.setState({discursos: speeches});

    if(lastCommand.method === "start"){
      this.setState({buttonStartDisabled: true});
      this.setState({startedSpeech: lastCommand});
      this.setState({running: true});
      this.setState({seconds: (Math.floor(new Date().getTime() / 1000) - Math.floor(new Date(lastCommand.speech.startedAt).getTime() / 1000))});
    }
  };

  startSpeech = async idSpeech => {
    const { data } = await api.get(`/speeches/start?id=${idSpeech}`);
    if(!!data.msg) alert(data.msg);
    else {
      this.setState({buttonStartDisabled: true});
      this.setState({startedSpeech: {method:"start", speech: data}});
      this.setState({running: true});
    };
  };

  stopSpeech = async () => {
    const { data } = await api.get(`/speeches/stop`);
    if(!!data.msg) alert(data.msg);
    else {
      this.setState({buttonStartDisabled: false});
      this.setState({startedSpeech: {}});
      this.setState({seconds: 0});
      this.setState({textCronometer: "00:00"});
      this.setState({classFooter: "footer-white"});
      this.setState({running: false});
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
      <div>
        <Header />
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

          <footer className={this.state.classFooter}>
            <div className="speech-details">

            </div>
            <div className="clock-view">
              { this.state.textCronometer }
              <div className="clock-stop" onClick={ () => this.stopSpeech() }>

              </div>
            </div>
            <div className="clock-functions">

            </div>
          </footer>
        </div>
      </div>
    );
  }
}
