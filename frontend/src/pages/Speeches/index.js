import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import './index.css';

const api = require('../../services/api');

export default function Speeches() {
    const [ speeches, setSpeeches ] = useState([]);
    const [ textCronometer, setTextCronometer ] = useState("00:00");
    const [ running, setRunnning ] = useState(false);
    const [ seconds, setSeconds ] = useState(0);
    const [ startedSpeech, setStartedSpeech ] = useState({});
    const [ classFooter, setClassFooter ] = useState("footer-white");

    const getSpeeches = async () => {
        const { data } = await api.get("/speeches");
        const { speeches, lastCommand } = data;
        if(lastCommand.method === 'start'){
            setStartedSpeech(lastCommand);
            setSeconds(Math.floor(new Date().getTime() / 1000) - Math.floor(new Date(lastCommand.speech.startedAt).getTime() / 1000));
            setRunnning(true);
        }
        setSpeeches(speeches);
    }

    useEffect(() => {
        getSpeeches();
    }, []);

    useEffect(() => {
        if(running === true){
            setTextCronometer(`${formatMinutes()}:${("0" + (seconds % 60)).slice(-2)}`);
            colorVerify();
            setTimeout(() => {
                setSeconds(seconds + 1);
            }, 1000);
        }
    // eslint-disable-next-line
    }, [ running, seconds ]);

    const startSpeech = async idSpeech => {
        const { data } = await api.get(`/speeches/start?id=${idSpeech}`);
        if(!!data.msg) alert(data.msg);
        else {
            setStartedSpeech({method:"start", speech: data});
            setRunnning(true);
        };
    }

    const stopSpeech = async () => {
      const { data } = await api.get(`/speeches/stop`);
      if(!!data.msg) alert(data.msg);
      else {
        setRunnning(false);
        setSeconds(0);
        setStartedSpeech({});
        setClassFooter("footer-white");
        setTextCronometer("00:00");
      };
    };

    const formatMinutes = () => {
      const minutes = Math.floor(seconds / 60);
      if(minutes.toString().length === 1) return `0${minutes}`;
      else return minutes;
    }

    const colorVerify = () => {
        if(((startedSpeech.speech.time * 60) - seconds) <= 60){
            if(((startedSpeech.speech.time * 60) - seconds) < 0) setClassFooter("footer-red");
            else {
                if((seconds % 2) === 0) setClassFooter("footer-red");
                else setClassFooter("footer-black");
            }
        }
    }

    return (
        <div>
          <Header />
          <div className="container">
            <div className="list-speeches-container">
              <table>
                  <thead>
                    <tr>
                      <th>Dia</th>
                      <th>Título</th>
                      <th>Tempo (Minutos)</th>
                      <th>Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                      {
                        speeches.map(speech => (
                            <tr key={ speech.id }>
                                <td>{ speech.day.description }</td>
                                <td>{ speech.title }</td>
                                <td>{ speech.time }</td>
                                <td>
                                    <button 
                                        className="startSpeech" 
                                        onClick={ () => startSpeech(speech.id) } 
                                        disabled={ running }
                                    > Iniciar </button>
                                </td>
                            </tr>
                        ))
                      }
                  </tbody>
              </table>
            </div>
  
            <footer className={classFooter}>
              <div className="speech-details">
  
              </div>
              <div className="clock-view">
                { textCronometer }
                <div className="clock-stop" onClick={() => stopSpeech()}>
                </div>
              </div>
              <div className="clock-functions">
  
              </div>
            </footer>
          </div>
        </div>
    );
}