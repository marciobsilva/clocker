import React, { Component } from 'react';
const api = require('../services/api');
const { Form } = require('./styles');

export default class CadastroDiscursos extends Component {

    state = {
        title: '',
        time: 0
    };

    handleSubmit = async e => {
        e.preventDefault();
        const { title, time } = this.state;

        await api.post('/speeches', { title, time })
            .then( response => alert(response.data.msg) )
            .catch( error => alert(error.response.data.msg) );
        this.props.history.push('/discursos')
    }

  render() {
    return (
        <Form onSubmit={ this.handleSubmit }>
            <label>Título: </label>
            <input type="text" name="title" onChange={ e => this.setState({ title: e.target.value }) }/>
            <label>Tempo: </label>
            <input type="number" name="time" onChange={ e => this.setState({ time: e.target.value }) }/>

            <button type="submit">Enviar</button>
        </Form>
    );
  }
}
