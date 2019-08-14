import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './index.css';

export default function Clock(){
    const [running, setRunning] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [textCronometer, setTextCronometer] = useState("00:00");
    const [classFooter, setClassFooter] = useState("body-clock");
    const [speech, setSpeech] = useState({});

    useEffect(() => {
        const socket = io('http://localhost:3001');
        socket.on("start", data => {
            setRunning(true);
            setSeconds(1);
        });

        socket.on("stop", data => {
            setRunning(false);
        });
    }, []);

    useEffect(() => {
        setTimeout(() => {
            if(running === true){
                setSeconds(seconds + 1);
            }
        }, 1000);
    }, [ seconds ]);

    useEffect(() => {
        setTextCronometer(`${formatMinutes()}:${("0" + (seconds % 60)).slice(-2)}`);
        colorVerify();
        if(running === false) {
            setTextCronometer(`00:00`);
            setSeconds(0);
        };
    }, [ seconds ]);

    const colorVerify = () => {
      if(((speech.time * 60) - seconds) <= 60){
        if(((speech.time * 60) - seconds) < 0) setClassFooter("body-clock-red");
        else {
          if((seconds % 2) === 0) setClassFooter("body-clock-red");
          else setClassFooter("body-clock-black");
        }
      }
    }

    const formatMinutes = () => {
      const minutes = Math.floor(seconds / 60);
      if(minutes.toString().length === 1) return `0${minutes}`;
      else return minutes;
    }

    return (
        <div className={ classFooter }>
            <h1>{ textCronometer }</h1>
        </div>
    );
}