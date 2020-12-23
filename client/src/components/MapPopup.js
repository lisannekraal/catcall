
import { makeStyles } from '@material-ui/core/styles';
import SideImage from './SideImage';
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

    </div>
  )
}