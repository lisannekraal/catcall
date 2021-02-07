//import React, { useState, useEffect, useContext } from "react";
import React, { useState} from "react";
//import MapGL, { Source, Layer, Image, NavigationControl, GeolocateControl, MapContext } from '@urbica/react-map-gl';
import MapGL, { Source, Layer, Image, NavigationControl, GeolocateControl} from '@urbica/react-map-gl';
//import MapboxGeocoder from 'mapbox-gl-geocoder';
//import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import Icon from '../../assets/bullhorn.png';

function MapForm ({ setLocation }) {
  const [viewport, setViewport] = useState({
    latitude: 52.366249,
    longitude: 4.908019,
    zoom: 12
  });
  const [ source, setSource ] = useState("");
  const [ layer, setLayer ] = useState("");

  function mapOnClick(e) {
    setLocation(e);
    const geojsonLayer = {
      type: "FeatureCollection",
      features: [{
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [e.lngLat.lng, e.lngLat.lat]
        }
      }]
    }
    setSource(<Source id="pin" type="geojson" data={geojsonLayer} />);
    setLayer(<Layer id="pin-layer" type="circle" source="pin" paint={{
      'circle-color': '#ba1642',
      'circle-radius': 5
    }} />);
  }

  return (
    process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
    ?
    <MapGL
      style={{ width: '500px', height: '300px' }}
      mapStyle='mapbox://styles/mapbox/streets-v11?optimize=true'
      accessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      latitude={viewport.latitude}
      longitude={viewport.longitude}
      zoom={viewport.zoom}
      onViewportChange={setViewport}
      onClick={e => mapOnClick(e)}
    >
      <Image id="catcall-icon" image={Icon} />
      {source}
      {layer}
      <NavigationControl showZoom position='top-right' />
      <GeolocateControl position='top-right' />
      {/* <GeocodeControl position='bottom-right' accessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN} /> */}
    </MapGL>
    :
    <p>Map to report a catcall could not load.</p>
  );
}

/**
 * ADDRESS SEARCH Functionality temporarily disabled
 * including imports
 * awaiting bug fix
 */

 /*
function GeocodeControl ({ position, accessToken }) {

  mapboxgl.Map = useContext(MapContext);
  const map = mapboxgl.Map;

  useEffect(() => {
    const control = new MapboxGeocoder({
      accessToken,
      placeholder: "Zoek",
      language: 'nl',
      mapboxgl
    })

    map?.addControl(
      control,
      position
    )

    return () => {
      map ? map.removeControl(control) : <div></div>
    }
  }, [map, position, accessToken]);

  return <div></div>
}
*/



export default MapForm;