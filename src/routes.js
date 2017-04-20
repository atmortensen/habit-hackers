import React, {Component} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Layout from './layout'
import Home from './views/home/home'
import Dashboard from './views/dashboard/dashboard'
import {Auth0} from './helpers/auth0'

export default class Routes extends Component {
  render(){
    return (
      <BrowserRouter>
          <Layout>
          
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/dashboard/:id?" component={Dashboard} />
              <Route path="/auth0" component={Auth0} />
              <Route render={function () {
                return (
                  <h2 
                    style={{
                      padding: '50px', 
                      textAlign: 'center'
                    }}>
                    Page not found!
                  </h2>
                )
              }} />
            </Switch>

          </Layout>
      </BrowserRouter>
    )
  } 
}