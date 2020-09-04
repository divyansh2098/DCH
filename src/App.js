import React from 'react';
import {Route,Switch} from 'react-router-dom'
import Signup from './containers/Auth/Auth'
import Matches from './containers/Matches/Matches'
import ScoringApp from './containers/ScoringApp/ScoringApp'
import classes from './App.module.css'
const App = props => {
  return(
    <div className={classes.App}>
      <Switch>
        <Route path="/authenticate" component={Signup} />
        <Route path="/matches" component={Matches} />
        <Route path="/scoringApp" component={ScoringApp} />
        <Route path="/" component={Signup} /> 
      </Switch>
    </div>
  )
}
export default App;