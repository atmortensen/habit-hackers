import React, {Component} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Layout from './layout'
import Home from './views/home/home'
import Inspiration from './views/inspiration/inspiration'
import Dashboard from './views/dashboard/dashboard'
import {Auth0} from './helpers/auth0'

export default class Routes extends Component {
  render(){
    return (
      <BrowserRouter>
          <Layout>
          
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path="/inspiration" component={Inspiration} />
              <Route path="/dashboard" component={Dashboard} />
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