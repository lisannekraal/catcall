import React, { useState } from "react";
import { useQuery } from '@apollo/client';
import MapGL, { Source, Layer, Image, Popup, NavigationControl, GeolocateControl, ScaleControl, FullscreenControl } from '@urbica/react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import './MapMain.css';

import Icon from '../assets/bullhorn.png';
import { GET_MAP_CATCALLS } from '../api/queries'


function MapMain () {
  const [ popup, setPopup ] = useState("");
  const { loading, error, data } = useQuery(GET_MAP_CATCALLS);
  if(error) console.log(error);
  data && console.log(data);

  const [viewport, setViewport] = useState({
    latitude: 52.366249,
    longitude: 4.908019,
    zoom: 12
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
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
                features: data.getVerifiedCatcalls
        }} />

        <Image id="catcall-icon" image={Icon} />
        <Layer
          id='catcall-layer'
          type='symbol'
          source='catcalls'
          layout={{
            'icon-image': 'catcall-icon',
            'icon-size': 0.06
          }}
          onClick={e => {
            setPopup(<Popup longitude={e.lngLat.lng} latitude={e.lngLat.lat} closeButton={true} closeOnClick={true} onClick={setPopup("")}>
            <div className="popup-content">

              <div className="popup-title">
                <div>CATCALL</div>
                <div className="popup-date">
                  { (e.features[0].properties.dateCatcall && e.features[0].properties.dateCatcall !== "null") ?
                  (new Date(Number(e.features[0].properties.dateCatcall))).toDateString() :
                  "" }
                </div>
              </div>

              <div className="popup-quote">
                <i className="popup-icon fas fa-bullhorn"></i>
                { e.features[0].properties.quote.length > 50 ?
                '"'+ e.features[0].properties.quote.slice(0,10) + '..."' :
                '"' + e.features[0].properties.quote + '"' }
              </div>

              <div className="popup-info">

                <div className="popup-context">
                  <i className="popup-icon fas fa-comment-dots"></i>
                  { e.features[0].properties.context.length > 100 ?
                  e.features[0].properties.context.slice(0,10) + '...' :
                  e.features[0].properties.context !== "null" ?
                  e.features[0].properties.context :
                  "" }
                </div>
                <div className="popup-img">
                  <i className="popup-icon fas fa-pen"></i>
                  { e.features[0].properties.url && e.features[0].properties.url !== "null" ?
                  <a href={e.features[0].properties.url} target="_blank" rel="noreferrer" referrerPolicy="no-referrer">See chalk on Insta</a> :
                  "Not chalked yet" }
                </div>

              </div>

            </div>
          </Popup>)}}
        />

        { popup && popup }


        <NavigationControl showCompass showZoom position='top-right' />
        <GeolocateControl position='top-right' />
        <FullscreenControl position='top-right' />
        <ScaleControl unit='metric' maxWidth="100" position='bottom-right' />

      </MapGL>
    </div>
  );
}
export default MapMain;