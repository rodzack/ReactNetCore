import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Login } from './components/Login';
import { Registro } from './components/Registro';
import { Equipos } from './components/Equipos';

export const routes = <Layout>
    <Route exact path='/' component={Login} />
    <Route path='/counter' component={ Counter } />
    <Route path='/fetchdata' component={FetchData} />
    <Route path='/Registro' component={Registro} />
    <Route path='/Equipos' component={Equipos} />
</Layout>;
