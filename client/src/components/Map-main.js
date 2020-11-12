import React, { useEffect, useRef, useState } from "react";
import { useQuery, gql } from '@apollo/client';
import mapboxgl from "mapbox-gl";
import MapGL, { Source, Layer, Image, NavigationControl, GeolocateControl, ScaleControl, FullscreenControl } from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './Map-main.css';
import Icon from '../assets/bullhorn.png';

const GET_CATCALLS = gql`
  {
    getCatcalls {
      _id
      type
      geometry {
        type
        coordinates
      }
      properties {
        quote
        context
        dateCatcall
        dateAdded
        url
        verified
        chalked
        listedForChalk
        starred
        trash
      }
    }
  }
`;

function MapMain () {
  const { loading, error, data } = useQuery(GET_CATCALLS);
  if(error) console.log(error);

  const [viewport, setViewport] = useState({
    latitude: 52.366249,
    longitude: 4.908019,
    zoom: 12
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  return (
    <MapGL
      style={{ width: '100vh', height: 'calc(100vh - 80px)', position: 'absolute' }}
      mapStyle='mapbox://styles/mapbox/streets-v11'
      accessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      latitude={viewport.latitude}
      longitude={viewport.longitude}
      zoom={viewport.zoom}
      onViewportChange={setViewport}
    >

      <Source id='catcalls' type='geojson' data={{
              type: 'FeatureCollection',
              features: data.getCatcalls
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