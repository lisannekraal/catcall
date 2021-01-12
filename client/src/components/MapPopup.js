import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useMutation } from '@apollo/client';
import { UPDATE_CATCALL } from '../api/queries';
import SideImage from './SideImage';
import { Card, CardActions, CardContent, Button, Typography, Tooltip } from '@material-ui/core';
import './MapPopup.css';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function MapPopup ({ catcall }) {
  const classes = useStyles();
  const [updateCatcall] = useMutation(UPDATE_CATCALL);
  const [ updated, setUpdated ] = useState(false);
  const [ displayVotes, setDisplayVotes ] = useState(catcall.properties.votes);

  const upvoteClick = () => {
    updateCatcall({
      variables: {
        id: catcall.properties.id,
        catcall: {
          properties: {
            votes: catcall.properties.votes+1
          }
        }
      }
    });
    setUpdated(true);
    setDisplayVotes(displayVotes+1);
  }

  return (
    <div className="popup-content">

      <div className="popup-title">
        <div>CATCALL</div>
        <div className="popup-date">
          { (catcall.properties.dateCatcall && catcall.properties.dateCatcall !== "null") ?
          (new Date(Number(catcall.properties.dateCatcall))).toDateString() :
          "" }
        </div>
      </div>

      <Card className={classes.root}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h3">
            {catcall.properties.quote}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {catcall.properties.context}
          </Typography>
        </CardContent>
        <CardActions>
          { catcall.properties.url ?
            <SideImage url={catcall.properties.url} />
            : <></>
          }
          <Tooltip title="Upvote" arrow>
            <Button size="small" color="primary" onClick={() => upvoteClick()} disabled={updated}>
              <i className="popup-icon fas fa-bullhorn"></i>
              <span>{displayVotes}</span>
            </Button>
          </Tooltip>
        </CardActions>
      </Card>

    </div>
  )
}