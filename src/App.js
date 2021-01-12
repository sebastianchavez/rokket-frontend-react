import React, { useState } from 'react'
import './App.css'
import { Switch, HashRouter  as Router } from 'react-router-dom'
import { GuardProvider, GuardedRoute } from 'react-router-guards'

import NotFound from './pages/404'
import Login from './pages/Login'
import Home from './pages/Home'

import { isLoggedIn } from './guards/isLoggedIn'

function App() {

  const [userAuth, setUserAuth] = useState(localStorage.getItem('isLoggedIn') ? true : false)

  return (
    <Router>
    <GuardProvider guards={[isLoggedIn]} error={NotFound}>
      <Switch>
          <GuardedRoute path="/" component={Home} exact meta={{ auth: true }} />
          <GuardedRoute path="/login" component={() => <Login {...{userAuth,setUserAuth}}/>} meta={{auth: false}} />
          <GuardedRoute path="*" component={NotFound}  />
      </Switch> 
    </GuardProvider>
    </Router>
  );
}

export default App
