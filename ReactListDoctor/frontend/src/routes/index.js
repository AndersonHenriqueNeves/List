import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Route from './Route';

import RegisterDoctor from '../pages/RegisterDoctor';
import RegisterUser from '../pages/RegisterUser';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Termos from '../pages/Termos';
import Privacy from '../pages/Privacy';
import UserProfile from '../pages/UserProfile';
import DashboardDoctor from '../pages/DashboardDoctor';
 
export default function Routes() {
  return (
      <Switch>
        <Route path="/register-doctor" component={RegisterDoctor} />
        <Route path="/register-user" component={RegisterUser} />
        <Route path="/privacidade" component={Privacy} />
        <Route path="/termos" component={Termos} />
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/dashboard-doctor" component={DashboardDoctor} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/user-profile" component={UserProfile}/>
      </Switch> 
  )
}