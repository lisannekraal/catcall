import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_MAP_CATCALLS } from '../../api/queries';
import MapGL, { Source, Layer, Image, Popup, NavigationControl, GeolocateControl, ScaleControl, FullscreenControl } from '@urbica/react-map-gl';

import MapDialogComp from './MapDialogComp';
import MapPopup from './MapPopup';
import MapFilter from './MapFilter';
import 'mapbox-gl/dist/mapbox-gl.css';
import Icon from '../../assets/bullhorn.png';
import { Player } from '@lottiefiles/react-lottie-player';
import Fab from '@material-ui/core/Fab';
import FilterListIcon from '@material-ui/icons/FilterList';

function MapMain ({ categoryLibrary }) {
  const [ popup, setPopup ] = useState("");
  const { loading, error, data } = useQuery(GET_MAP_CATCALLS);
  const location = useLocation();
  const [ dialog ] = useState(location.state ? location.state.dialog : "");
  const [ geojsonData, setGeojsonData ] = useState([]);
  const [ filterOpen, setFilterOpen ] = useState(false);

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

  function filterChalked(index) {
    const originalAdjustedArr = [];
    data.getVerifiedCatcalls.forEach((feature) => {
      let item = JSON.parse(JSON.stringify(feature));
      item.properties.id = feature._id
      originalAdjustedArr.push({
        ...item
      });
    });
    if (index === 0) {
      //filter back to all catcalls
      setGeojsonData(originalAdjustedArr);
    } else if (index === 1) {
      //filter to chalked catcalls
      const newDataObj = originalAdjustedArr.filter(function(item) {
        return item.properties.chalked === true;
      });
      setGeojsonData(newDataObj);
    } else {
      //filter to not chalked catcalls
      const newDataObj = originalAdjustedArr.filter(function(item) {
        return item.properties.chalked === false;
      });
      setGeojsonData(newDataObj);
    }
  }

  function filterCategories(arr) {
    const originalAdjustedArr = [];
    data.getVerifiedCatcalls.forEach((feature) => {
      let item = JSON.parse(JSON.stringify(feature));
      item.properties.id = feature._id
      originalAdjustedArr.push({
        ...item
      });
    });
    if (arr.length < 1) {
      setGeojsonData(originalAdjustedArr);
    } else {
      const newDataObj = [];
      originalAdjustedArr.forEach((item) => {
        if (item.properties.categories.some(category => arr.includes(category))) {
          newDataObj.push(item);
        }
      });
      setGeojsonData(newDataObj);
    }
  }

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
    <>

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
              setPopup(
                <Popup 
                  longitude={e.lngLat.lng} 
                  latitude={e.lngLat.lat} 
                  closeButton={true} closeOnClick={true} 
                  onClick={setPopup("")}>
                    <MapPopup 
                      catcall={e.features[0]} 
                      categoryLibrary={categoryLibrary} />
                </Popup>
              );
            }}
          />

          { popup && popup }
          <NavigationControl showCompass showZoom position='top-right' />
          <GeolocateControl position='top-right' />
          <FullscreenControl position='top-right' />
          <ScaleControl unit='metric' maxWidth="100" position='bottom-right' />

          {/* floating action button if filter is closed */}
          { !filterOpen && <Fab variant="extended" style={{textTransform: 'none', marginTop: '15px', marginLeft: '15px', color: 'white', backgroundColor: 'rgb(245, 37, 89)'}} onClick={e => {setFilterOpen(true)}}>
            <FilterListIcon />
              Open map filters
          </Fab>}

          {/* open filter: paper, card? */}
          {filterOpen &&
            <MapFilter 
              setFilterOpen={setFilterOpen}
              categoryLibrary={categoryLibrary}
              filterChalked={filterChalked}
              filterCategories={filterCategories}
            />
          }

        </MapGL>

        {dialog && <MapDialogComp text={dialog} state={true} />}
      </div>
    </>
  );
}
export default MapMain;