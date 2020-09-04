import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import customClass from './MatchCard.module.css'
const useStyles = makeStyles({
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard() {
  const classes = useStyles();
  //const bull = <span className={classes.bullet}>•</span>;
  let date = new Date();
  return (
    <Card className={customClass.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {
          date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()}
        </Typography>
        <Typography variant="h5" component="h2">
          Team1 v/s Team2
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Match result
        </Typography>
        <Typography variant="body2" component="p">
          Team1 : 121/10
          <br />
          Team2 : 122/9
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Full Scorecard</Button>
      </CardActions>
    </Card>
  );
}
