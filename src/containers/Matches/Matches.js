import React, { Component } from 'react'
import MatchCard from '../../components/UI/Card/MatchCard'
import classes from './Matches.module.css'
import Card from '@material-ui/core/Card';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Aux from '../../hoc/Auxiliary/Auxiliary'
import {connect} from 'react-redux'
class Matches extends Component{
    render(){
        let addButton = null;
        if(this.props.isScorer)
        {
            addButton = <Card className={classes.Card}>
                            <Fab color="primary" aria-label="add">
                                <AddIcon />
                            </Fab>
                        </Card>
        }
        return(
            <Aux>
                <div className={classes.Matches}>
                    {addButton}
                    <MatchCard />
                    <MatchCard />
                    <MatchCard />
                </div>
            </Aux>
        )
    }
}
const mapStatetoProps = state => {
    return {
        isScorer: state.auth.isScorer
    }
}
export default connect(mapStatetoProps,null)(Matches)