import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useMutation } from '@apollo/client';
import { UPVOTE_CATCALL } from '../api/queries';
import SideImage from './SideImage';
import { Tooltip } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './MapPopup.css';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const categoryLibrary = {
  'sexual': 'Sexual Harassment',
  'homophobia': 'Homophobia',
  'transphobia': 'Transphobia',
  'fatphobia': 'Fatphobia',
  'racism': 'Racism',
  'fetishization': 'Fetishization',
  'slutshaming': 'Slutshaming',
  'hateSpeech': 'Hate speech',
  'young': 'Young',
  'assault': 'Assault',
  'staring': 'Staring',
  'following': 'Following'
}

function convertToCategoryName(category) {
  return categoryLibrary[category];
}

export default function MapPopup ({ catcall }) {
  const classes = useStyles();
  const [upvoteCatcall] = useMutation(UPVOTE_CATCALL);
  const [ updated, setUpdated ] = useState(false);
  const [ displayVotes, setDisplayVotes ] = useState(catcall.properties.votes);

  const upvoteClick = () => {
    upvoteCatcall({
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
        <div className="normal-font">CATCALL</div>
        <div className="popup-date normal-font">
          { (catcall.properties.dateCatcall && catcall.properties.dateCatcall !== "null") ?
          (new Date(Number(catcall.properties.dateCatcall))).toDateString() :
          "" }
        </div>
      </div>

      <Card className={classes.root}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h3">
            "{catcall.properties.quote}"
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {catcall.properties.context}
          </Typography>
          { JSON.parse(catcall.properties.categories).length > 0 &&
            <div style={{marginTop: '6px'}}>
              {JSON.parse(catcall.properties.categories).map((category) =>(
                <Button variant="outlined" size="small" color="secondary" style={{marginRight: '2px'}}>
                  {convertToCategoryName(category)}
                </Button>
              ))}
            </div>
          }
        </CardContent>
        <CardActions>
          { catcall.properties.url ?
            <SideImage url={catcall.properties.url} />
            : <></>
          }
          <Tooltip title="Call out" arrow>
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