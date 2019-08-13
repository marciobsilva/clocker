import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import CadastroDiscursos from './components/CadastroDiscursos';
import SpeechesList from './pages/Speeches';

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={() => <h1>MAIN</h1>}></Route>
            <Route exact path="/discursos" component={SpeechesList}></Route>
            <Route exact path="/discursos/new" component={CadastroDiscursos}></Route>
        </Switch>
    </Router>
);

export default Routes;