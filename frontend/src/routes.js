import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import SpeechesList from './pages/Speeches';
import Clock from './pages/Clock';

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path="/discursos" component={SpeechesList}></Route>
            <Route exact path="/clock" component={Clock}></Route>
        </Switch>
    </Router>
);

export default Routes;