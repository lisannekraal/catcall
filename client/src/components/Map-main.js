import React, { useState } from "react";
import { useQuery } from '@apollo/client';
import MapGL, { Source, Layer, Image, NavigationControl, GeolocateControl, ScaleControl, FullscreenControl } from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './Map-main.css';
import Icon from '../assets/bullhorn.png';
import { GET_MAP_CATCALLS } from '../api/queries'


function MapMain () {
  const { loading, error, data } = useQuery(GET_MAP_CATCALLS);
  if(error) console.log(error);
  data && console.log(JSON.stringify(data.getFilteredCatcalls));

  const [viewport, setViewport] = useState({
    latitude: 52.366249,
    longitude: 4.908019,
    zoom: 12
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  return (
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
      />

      <NavigationControl showCompass showZoom position='top-right' />
      <GeolocateControl position='top-right' />
      <FullscreenControl position='top-right' />
      <ScaleControl unit='metric' maxWidth="100" position='bottom-right' />

    </MapGL>
  );
}
export default MapMain;