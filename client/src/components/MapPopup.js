import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import SideImage from './SideImage';
import InstaTile from "./InstaTile";
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
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


  function handleInsta() {
    console.log('open side thing');
  }

  return (
    <div className="popup-content">

      <div className="popup-title">
        <div>CATCALL</div>
        <div className="popup-date">
          { (catcall.dateCatcall && catcall.dateCatcall !== "null") ?
          (new Date(Number(catcall.dateCatcall))).toDateString() :
          "" }
        </div>
      </div>

      <Card className={classes.root}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h3">
            {catcall.quote}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {catcall.context}
          </Typography>
        </CardContent>
        <CardActions>
          { catcall.url ?
            <SideImage url={catcall.url} />

            : <></>
          }
          <Button size="small" color="primary">
            <i className="popup-icon fas fa-bullhorn"></i><span>5</span>
          </Button>
        </CardActions>
      </Card>

    {/* <div className="popup-quote">
      <i className="popup-icon fas fa-bullhorn"></i>
      { catcall.quote.length > 50 ?
      '"'+ catcall.quote.slice(0,10) + '..."' :
      '"' + catcall.quote + '"' }
    </div>

    <div className="popup-info">

      <div className="popup-context">
        <i className="popup-icon fas fa-comment-dots"></i>
        { catcall.context.length > 100 ?
        catcall.context.slice(0,10) + '...' :
        catcall.context !== "null" ?
        catcall.context :
        "" }
      </div>
      <div className="popup-img">
        <i className="popup-icon fas fa-pen"></i>
        { 
          catcall.url && catcall.url !== "null" ?
          <a>See chalk back</a> :
          // <a href={e.features[0].properties.url} target="_blank" rel="noreferrer" referrerPolicy="no-referrer">See chalk on Insta</a> :
          "Not chalked yet" 
        }
      </div> */}


    </div>
  )
}