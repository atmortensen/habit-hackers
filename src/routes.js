import React, {Component} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Layout from './components/layout'
import Home from './components/home'
import Login from './components/login'
import {Auth0} from './helpers/auth0'

export default class Routes extends Component {
  render(){
    return (
      <BrowserRouter>
          <Layout>
          
            <Switch>
              <Route exact path='/' component={Home} />  
              <Route path="/login" component={Login} />
              <Route path="/auth0" component={Auth0} />
              <Route render={function () {
                return <p>Not Found</p>
              }} />
            </Switch>

          </Layout>
      </BrowserRouter>
    )
  } 
}