import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import classes from './ScoringApp.module.css'
import Button from '../../components/UI/MaterialButton/Button'
import Table from '../../components/UI/Table/Table'
import IconButton from '@material-ui/core/IconButton'
import {Replay} from '@material-ui/icons'
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Data from '../../data/Dummy.json'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const ScoreControls = [0,1,2,3,4,5,6,'Wicket','Wide','No-Ball'];
const wideOptions = [0,1,2,3,4];
const wicketOptions = ['bowled','caught','caught-Behind','stumped','run-Out','LBW'];
function createData(player, runs=0, balls=0, fours=0, sixes=0, StrikeRate=0,Overs=0,runsConceded=0,Wickets=0,Extras=0,Econ=0) {
        return {player, runs, balls, fours, sixes, StrikeRate,Overs,runsConceded,Wickets,Extras,Econ}
  }
const batTeam = Data.battingTeam.map(player=>{
    return createData(player)
})
const bowlTeam = Data.bowlingTeam.map(player=>{
    return createData(player)
})
const ScoringApp = (props) => {
    const [state,setState] = useState({controlLevel: 0,Runs: 0,wickets: 0,RR: 0,balls: 0})
    const [battingTeam,updateBattingTeam] = useState(batTeam);
    const [bowlingTeam,updateBowlingTeam] = useState(bowlTeam);
    const [battingPlayers,setBattingPlayers] = useState([0,1]);
    const [bowlingPlayer,setBowlingPlayers] = useState(0);
    const [strike,changeStrike] = useState(0);
    //const [onCreaseBatsmen,editonCreaseBatsmen] = useState([battingTeam[battingPlayers[0]] , battingTeam[battingPlayers[1]]]);
    const onCreaseBatsmen = [battingTeam[battingPlayers[0]],battingTeam[battingPlayers[1]]]
    const Bowler = [bowlingTeam[bowlingPlayer]]
    const nextBall = (runChange,wicketChange,control,ballChange = 1) => {
        setState(prevState=>{
            const updatedBalls = (prevState.balls + ballChange);
            const updatedRuns = (prevState.Runs + runChange);
            return {
                ...state,
                prevState: {
                    ...prevState,
                    prevState: null
                },
                Runs: updatedRuns,
                wickets: prevState.wickets + wicketChange,
                balls: updatedBalls,
                RR: updatedBalls!==0 ? (updatedRuns*6/updatedBalls).toFixed(2) : "--",
                controlLevel: 0
            }
        })
        updateBatsmanStats(runChange,ballChange,control)
        updateBowlerStats(runChange,ballChange,control)
    }
    const updateBowlerStats = (runChange,ballChange,control) => {
        let extras = 0;
        let wickets = 0;
        if(control==='Wide'||control==='No-Ball')
            extras = runChange;
        if(control==='Wicket')
            wickets = 1;
        const updatedOvers = (bowlingTeam[bowlingPlayer].Overs + ballChange);
        const updatedRuns = (bowlingTeam[bowlingPlayer].runsConceded + runChange);
        const updatedBowlerStats = {
            ...bowlingTeam[bowlingPlayer],
            Overs: updatedOvers,
            runsConceded: updatedRuns,
            Extras: bowlingTeam[bowlingPlayer].Extras + extras,
            Wickets: bowlingTeam[bowlingPlayer].Wickets + wickets,
            Econ: (updatedRuns*6/updatedOvers).toFixed(2)
        }
        const updatedBowlingTeam = bowlingTeam
        updatedBowlingTeam[bowlingPlayer] = updatedBowlerStats
        updateBowlingTeam(updatedBowlingTeam)
    }
    const updateBatsmanStats = (runChange,ballChange,control)=>{
        let runOnExtra = false;
        let runChange_copy = 0;
        if(control==='Wide'||control==='No-Ball'){
            runChange_copy = runChange-1
            runChange = 0;
            runOnExtra = true
        }
        const updatedBalls = (battingTeam[battingPlayers[strike]].balls + ballChange);
        const updatedRuns = (battingTeam[battingPlayers[strike]].runs + runChange);
        const updatedBatsmanStats = {
            ...battingTeam[battingPlayers[strike]],
            runs: battingTeam[battingPlayers[strike]].runs + runChange,
            balls: battingTeam[battingPlayers[strike]].balls + ballChange,
            fours: battingTeam[battingPlayers[strike]].fours + (runChange===4 ? 1 : 0),
            sixes: battingTeam[battingPlayers[strike]].sixes + (runChange===6 ? 1 : 0),
            StrikeRate: updatedBalls!==0 ? (updatedRuns*100/updatedBalls).toFixed(2) : 0
        }
        const updatedBattingTeam = battingTeam
        updatedBattingTeam[battingPlayers[strike]] = updatedBatsmanStats
        updateBattingTeam(updatedBattingTeam)
        if(runChange%2||(runOnExtra&&runChange_copy%2))
        {
            changeStrike(prevStrike=>{
                return Number(!prevStrike)
            })
        }
    }
    const enableControlsHandler = () => {
        setState({
            ...state,
            controlLevel: 1
        })
    }
    const undoState = () => {
        console.log("Undo triggered");
    }
    const enableWideOptionsHandler = () => {
        setState({
            ...state,
            controlLevel: 2
        })
    }
    const enableWicketOptionsHandler = () => {
        setState({
            ...state,
            controlLevel: 3
        })
    }
    const reduceControlLevel = () => {
        setState(prevState=>{
            return {
                ...prevState,
                controlLevel: prevState.controlLevel===1 ? 0 : 1
            }
        })
    }
    const controls = ScoreControls.map(control=>{
        if(typeof(control)==="number")
        {
            return(
                <Button color="primary" size="medium" key={control}
                onClick={()=>nextBall(control,0)}
                >{control}</Button>
            )
        }
        else
        {
            switch(control){
                case 'Wide':
                    return <Button color="primary" size="medium" 
                    onClick={enableWideOptionsHandler}key={control}>{control}</Button>
                case 'No-Ball':
                    return <Button color="primary" size="medium" 
                    onClick={()=>nextBall(1,0,control,0)}key={control}>{control}</Button>
                case 'Wicket' :
                    return <Button color="primary" size="medium" 
                    onClick={enableWicketOptionsHandler}key={control}>{control}</Button>
                default:
                    return null    
            }

        }
    })
    controls.push(<IconButton onClick={reduceControlLevel}><ArrowBackIcon color="error" fontSize="small" /></IconButton>)
    const wicketButtons = wicketOptions.map(option=>{
        return(
            <Button color="primary" size="medium" key={option}
                onClick={()=>nextBall(0,1,"Wicket",1)}>{option}</Button>
        )
    })
    wicketButtons.push(<IconButton onClick={reduceControlLevel}><ArrowBackIcon color="error" fontSize="small" /></IconButton>)
    const wideButtons = wideOptions.map(option=>{
        return(
            <Button color="primary" size="medium" key={option}
                onClick={()=>nextBall(option+1,0,"Wide",0)}>{"+" + option}</Button>
        )
    })
    wideButtons.push(<IconButton onClick={reduceControlLevel}><ArrowBackIcon color="error" fontSize="small" /></IconButton>) 
    const button = <Aux>
        <Button color="secondary" 
        size="large" onClick={enableControlsHandler}>Next Ball</Button>
        <IconButton onClick={undoState}><Replay color="error" fontSize="large" /></IconButton>
    </Aux>
    let grid = null;
    switch(state.controlLevel){
        case 0:
            grid = button
            break;
        case 1:
            grid = controls
            break;
        case 2:
            grid = wideButtons
            break;
        case 3:
            grid = wicketButtons
            break;
        default:
            grid = null;
            break;
    }
    return(
        <div className={classes.Container}>
            <Typography align='center' variant='h2' gutterBottom>
                Score: {state.Runs}/{state.wickets}
            </Typography>
            <Typography variant='h5' color='textSecondary' gutterBottom>
                Overs: {Math.floor(state.balls/6)}.{state.balls%6}
            </Typography>
            <Typography variant='h5' color='textSecondary' gutterBottom>
                Current RR: {state.RR}
            </Typography>
            <div className={classes.ControlGrid}>
                {grid}
            </div>
            <div className={classes.Tables}>
                <Table battingData={onCreaseBatsmen} strike={battingPlayers[strike]}/>
                <Table bowlingData={Bowler}/>
            </div>
        </div>
    )
}
export default ScoringApp