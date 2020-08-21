import React, { Component } from 'react';
import './App.css';
import {Route,Switch} from 'react-router-dom'
import Signup from './containers/Auth/Auth'
class App extends Component{
  render(){
    return(
      <div>
        <Switch>
          <Route path="/authenticate" component={Signup} />
        </Switch>
      </div>
    )
  }
}
export default App;