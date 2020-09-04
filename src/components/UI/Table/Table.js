import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {NavLink} from 'react-router-dom'
import Aux from '../../../hoc/Auxiliary/Auxiliary'
import { lightGreen } from '@material-ui/core/colors';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);
const StyledTableRow = withStyles((theme) => ({
  root: {
  },
}))(TableRow);

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

const useStyles = makeStyles({
  container: {
    width: "80%",
    margin: "20px",
  },
  Links: {
    textDecoration: "none",
    color: "inherit"
  },
  Rows: {
    backgroundColor: "lightGreen",
    color: "white"
  }
});

const CustomizedTables = (props) => {
  const classes = useStyles();
  const Data = props.battingData ? props.battingData : props.bowlingData
  const isBatting = props.battingData ? true: false;
  return (
    <TableContainer className={classes.container} component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            {props.battingData ? <Aux>
            <StyledTableCell>Batsman</StyledTableCell>
            <StyledTableCell align="right">Runs</StyledTableCell>
            <StyledTableCell align="right">Balls</StyledTableCell>
            <StyledTableCell align="right">4's</StyledTableCell>
            <StyledTableCell align="right">6's</StyledTableCell>
            <StyledTableCell align="right">S/R</StyledTableCell></Aux> : 
          <Aux>
            <StyledTableCell>Bowler</StyledTableCell>
          <StyledTableCell align="right">Overs</StyledTableCell>
          <StyledTableCell align="right">Runs</StyledTableCell>
          <StyledTableCell align="right">Wickets</StyledTableCell>
          <StyledTableCell align="right">Extras</StyledTableCell>
          <StyledTableCell align="right">Econ</StyledTableCell></Aux>
          }
          </TableRow>
        </TableHead>
        <TableBody>
          {Data.map((player,i) => {
            const style = props.strike===i ? classes.Rows : null
            return(
            <StyledTableRow key={i} className={style}>
              <StyledTableCell scope="row">
                <NavLink className={classes.Links} to="/">{player.player.name}</NavLink>
              </StyledTableCell>
              <StyledTableCell align="right">{isBatting ? player.runs : Math.floor(player.Overs/6) + "." + player.Overs%6 }</StyledTableCell>
              <StyledTableCell align="right">{isBatting ? player.balls : player.runsConceded}</StyledTableCell>
              <StyledTableCell align="right">{isBatting ? player.fours : player.Wickets}</StyledTableCell>
              <StyledTableCell align="right">{isBatting ? player.sixes : player.Extras}</StyledTableCell>
              <StyledTableCell align="right">{isBatting ? player.StrikeRate : player.Econ}</StyledTableCell>
            </StyledTableRow>
          )})}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default CustomizedTables