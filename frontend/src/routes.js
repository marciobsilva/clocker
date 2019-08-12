import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ListaDiscursos from './components/ListaDiscursos';
import CadastroDiscursos from './components/CadastroDiscursos';
import development from './pages/Speeches';

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={() => <h1>MAIN</h1>}></Route>
            <Route exact path="/discursos" component={ListaDiscursos}></Route>
            <Route exact path="/discursos/new" component={CadastroDiscursos}></Route>
            <Route exact path="/development" component={development}></Route>
        </Switch>
    </Router>
);

export default Routes;