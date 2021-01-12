import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_MAP_CATCALLS } from '../api/queries';
import MapGL, { Source, Layer, Image, Popup, NavigationControl, GeolocateControl, ScaleControl, FullscreenControl } from '@urbica/react-map-gl';

import DialogComp from './DialogComp';
import MapPopup from './MapPopup';
import 'mapbox-gl/dist/mapbox-gl.css';
import './MapMain.css';
import Icon from '../assets/bullhorn.png';
import { Player } from '@lottiefiles/react-lottie-player';

function MapMain () {
  const [ popup, setPopup ] = useState("");
  const { loading, error, data } = useQuery(GET_MAP_CATCALLS);
  const location = useLocation();
  const [ dialog ] = useState(location.state ? location.state.dialog : "");
  const [ geojsonData, setGeojsonData ] = useState([]);

  useEffect(() => {
    if (data) {
      let newDataObj = [];
      data.getVerifiedCatcalls.forEach((feature) => {
        let item = JSON.parse(JSON.stringify(feature));
        item.properties.id = feature._id
        newDataObj.push({
          ...item
        });
      });
      setGeojsonData(newDataObj);
    }
  }, [data])

  const [viewport, setViewport] = useState({
    latitude: 52.366249,
    longitude: 4.908019,
    zoom: 12
  });

  if (loading) return (
    <div data-testid="page-not-found" className="not-found-container">
      <div className="header-footer"></div>
      <div data-testid="page-not-found" className="not-found">
        <h1>Loading</h1>
        <Player
          autoplay
          loop
          src="https://assets8.lottiefiles.com/packages/lf20_vndsLD.json"
          style={{ height: '300px', width: '300px' }}
        >
        </Player>
      </div>
    </div>
  );
  if (error) return (
    <div data-testid="page-not-found" className="not-found-container">
      <div className="header-footer"></div>
      <div data-testid="page-not-found" className="not-found">
        <h1>501</h1>
        <h2>Oops! Something went wrong.</h2>
      </div>
    </div>
  );
  return (
    <div className="map-container" data-testid="map-main">
      <MapGL
        style={{ width: '100vw', height: '100%' }}
        mapStyle='mapbox://styles/mapbox/streets-v11'
        accessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        latitude={viewport.latitude}
        longitude={viewport.longitude}
        zoom={viewport.zoom}
        onViewportChange={setViewport}
      >

        <Source id='catcalls' type='geojson' data={{
                type: 'FeatureCollection',
                features: geojsonData
        }} />

        <Image id="catcall-icon" image={Icon} />
        <Layer
          id='catcall-layer'
          type='symbol'
          source='catcalls'
          layout={{
            'icon-image': 'catcall-icon',
            'icon-size': 0.06,
            'icon-allow-overlap': true
          }}
          onClick={e => {
            //setviewport functionality (does not give the satisfying effect of mapbox' fly-to behavior, but it was hard to implement that here)

            // setViewport({
            //   latitude: e.features[0].geometry.coordinates[1],
            //   longitude: e.features[0].geometry.coordinates[0],
            //   zoom: 14
            // });
            setPopup(<Popup longitude={e.lngLat.lng} latitude={e.lngLat.lat} closeButton={true} closeOnClick={true} onClick={setPopup("")}>
              <MapPopup catcall={e.features[0]} />
            </Popup>)
          }}
        />

        { popup && popup }
        <NavigationControl showCompass showZoom position='top-right' />
        <GeolocateControl position='top-right' />
        <FullscreenControl position='top-right' />
        <ScaleControl unit='metric' maxWidth="100" position='bottom-right' />


      </MapGL>
    {dialog && <DialogComp text={dialog} state={true} />}
    </div>
  );
}
export default MapMain;