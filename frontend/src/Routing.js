import React from 'react'
import {Route,Switch} from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Signin from './pages/Signin'
import Signup from './pages/Signup'

const Routing = () =>{

    return (
      <Switch>
        <Route path="/" component={Signin} exact />
        <Route path="/signup" component={Signup} exact />
        <Route path="/dashboard" component={Dashboard} exact />
      </Switch>
    );

}

export default Routing
