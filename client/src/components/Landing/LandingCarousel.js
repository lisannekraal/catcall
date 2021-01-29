import React from 'react';
import { useTranslation } from 'react-i18next';
import Carousel from 'react-material-ui-carousel'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LogoRot from '../../assets/catcallsofrot.png';
import LogoUtr from '../../assets/catcallsofutr.png';
import LogoNyc from '../../assets/catcallsofnyc.png';
import LogoGrunn from '../../assets/catcallsofgrunn.png';
import { v4 as uuidv4 } from 'uuid';

function LandingCarousel({ citiesDisplayed }) {

  const { t } = useTranslation(['landing']);

  const cities = [
      {
        name: 'R\'DAM',
        logo: LogoRot,
        status: t('cities.status-soon', 'default')
      },
      {
        name: 'UTRECHT',
        logo: LogoUtr,
        status: t('cities.status-soon', 'default')
      },
      {
        name: 'NEW YORK',
        logo: LogoNyc,
        status: t('cities.status-soon', 'default')
      },
      {
        name: 'ANTWERP',
        logo: LogoNyc,
        status: t('cities.status-soon', 'default')
      },
      {
        name: 'BERLIN',
        logo: LogoNyc,
        status: t('cities.status-soon', 'default')
      },
      {
        name: 'GRONINGEN',
        logo: LogoGrunn,
        status: t('cities.status-soon', 'default')
      }
  ];

  function citiesToDisplay(citiesPerRow) {
    let count = 0;
    let row = 0;
    let citiesList = [[]];

    for(let i = 0; i < cities.length; i++) {
      let city = cities[i];

      if(count < citiesPerRow){
        citiesList[row].push(city)
        count++;
      }
      else{
        citiesList.push([]);
        row++;
        citiesList[row].push(city);
        count = 1;
      }
    }
    return citiesList;
  }


  function Group({ group }) {
    return (
      <div className="carousel-content">
        {
          group.map((city, i) =>
            <City key={uuidv4()} city={city} />
          )
        }
      </div>
    )
  }

  function City({ city }) {
    return (
      < div className="city" >
        <div>
          <div className="city-logo">
            <img alt="city-logo" src={city.logo}></img>
          </div>
        </div>
        <div>
          <div className="city-name catcall-font">
            <LocationOnIcon fontSize="small" />
            {city.name}
          </div>
          <p className="city-description">{city.status}</p>
        </div>
      </div >
    )
  }

  const citiesInRows = citiesToDisplay(citiesDisplayed);

  return (
    <div>
      <div className="landing-cities">
        <Carousel className="carousel-overflow">
          {
            citiesInRows.map((group, i) =>
              <Group key={uuidv4()} group={group} />
            )
          }
        </Carousel>
      </div>

    </div>
  )
}

export default LandingCarousel
