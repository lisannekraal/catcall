import React, { useState, useEffect } from "react";
import { useQuery } from '@apollo/client';
import MapGL, { Source, Layer, Image, Popup, NavigationControl, GeolocateControl, ScaleControl, FullscreenControl } from '@urbica/react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import './Map-main.css';

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
    <>
    <MapGL
      style={{ width: '500px', height: '700px' }}
      mapStyle='mapbox://styles/mapbox/streets-v11'
      accessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      latitude={viewport.latitude}
      longitude={viewport.longitude}
      zoom={viewport.zoom}
      onViewportChange={setViewport}
    >

      <Source id='catcalls' type='geojson' data={{
              type: 'FeatureCollection',
              features: data.getFilteredCatcalls
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
          console.log(e.features[0].properties); 
          setPopup(<Popup longitude={e.lngLat.lng} latitude={e.lngLat.lat} closeButton={true} closeOnClick={true} onClick={setPopup("")}>
          <div className="popup-content">
            <div className="popup-title">
              <div>CATCALL</div>
              <div className="popup-date">{ (e.features[0].properties.dateCatcall && e.features[0].properties.dateCatcall !== "null") ? (new Date(Number(e.features[0].properties.dateCatcall))).toDateString() : "" }</div>
            </div>
            <div className="popup-quote">{ e.features[0].properties.quote.length > 50 ? '"'+ e.features[0].properties.quote.slice(0,10) + '..."' : '"' + e.features[0].properties.quote + '"' }</div>
            <div className="popup-info">
              <div className="popup-context">{ e.features[0].properties.context.length > 100 ? e.features[0].properties.context.slice(0,10) + '...' : e.features[0].properties.context !== "null" ? e.features[0].properties.context : "" }</div>
              <div className="popup-img">{ e.features[0].properties.url ? <a href={e.features[0].properties.url} target="_blank" referrerPolicy="no-referrer" ></a> : "Not chalked yet" }</div>
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

    </>
  );
}
export default MapMain;