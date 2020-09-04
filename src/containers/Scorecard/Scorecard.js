import React, { Component } from 'react'
import Table from '../../components/UI/Table/Table'
import classes from './Scorecard.module.css'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
function createData(name, runs, balls, fours, sixes, StrikeRate) {
    return { name, runs, balls, fours, sixes, StrikeRate };
  }
  
const battingStats = [
createData('Rohit Sharma', 89, 97, 7, 2,((89/97)*100).toFixed(2)),
createData('Virat Kohli', 89, 97, 7, 2,((89/97)*100).toFixed(2)),
createData('KL Rahul', 89, 97, 7, 2,((89/97)*100).toFixed(2)),
createData('Suresh Raina', 89, 97, 7, 2,((89/97)*100).toFixed(2)),
createData('MS Dhoni', 89, 97, 7, 2,((89/97)*100).toFixed(2)),
];
class Scorecard extends Component{
    state = {
        BattingStats: null,
        BowlingStats: null,
        innings: '2nd'
    }
    changeInningsHandler = () => {
        this.setState(prevState=>{
            return {
                innings: prevState.innings==='1st' ? '2nd' : '1st'
            }
        })
    }
    render(){
        return(
            <div className={classes.Scorecard}>
                <h1>Match - 1</h1>
                <ButtonGroup size="small" aria-label="small outlined button group">
                    <Button onClick={this.changeInningsHandler} size='large' color='secondary'>{this.state.innings} Innings</Button>
                </ButtonGroup>
                <h2>Team-Name</h2>
                <Table battingData={battingStats} />
                <h2>Team-Name</h2>
                <Table battingData={battingStats}/>
            </div>
        )
    }
}
export default Scorecard