import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useMutation } from '@apollo/client';
import { UPVOTE_CATCALL } from '../../api/queries';
import MapSideImage from './MapSideImage';
import { Tooltip } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function MapPopup ({ catcall, categoryLibrary }) {

  const { t } = useTranslation(['map']);
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
          <Typography gutterBottom variant="subtitle1">
            "{catcall.properties.quote}"
          </Typography>
          <div style={{maxHeight: '100px', overflowY: 'auto'}}>
            <Typography variant="body2" color="textSecondary" component="p">
              {catcall.properties.context}
            </Typography>
          </div>
          { JSON.parse(catcall.properties.categories).length > 0 &&
            <div style={{marginTop: '6px'}}>
              {JSON.parse(catcall.properties.categories).map((category) =>(
                <Button variant="outlined" size="small" color="secondary" style={{marginRight: '2px'}}>
                  {categoryLibrary[category]}
                </Button>
              ))}
            </div>
          }
        </CardContent>
        <CardActions>
          { catcall.properties.url ?
            <MapSideImage 
              url={catcall.properties.url} 
              text={t('popup.chalk-text', 'default')} 
              help={t('popup.chalk-help', 'default')} 
              button={t('popup.chalk-button', 'default')} />
            : <></>
          }
          <Tooltip title={t('popup.upvote-help', 'default')} arrow>
            <Button size="small" color="primary" onClick={() => upvoteClick()} disabled={updated}>
              <ThumbDownIcon style={{color: 'rgb(245, 37, 89)', fontSize: '17px', marginRight: '3px'}} />
              <span>{displayVotes}</span>
            </Button>
          </Tooltip>
        </CardActions>
      </Card>

    </div>
  )
}