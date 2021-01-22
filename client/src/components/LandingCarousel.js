import React from 'react'

import Carousel from 'react-material-ui-carousel'
import './LandingCarousel.css';

import LogoRot from '../assets/catcallsofrot.png';
import LogoUtr from '../assets/catcallsofutr.png';
import LogoNyc from '../assets/catcallsofnyc.png';
import LogoGrunn from '../assets/catcallsofgrunn.png';
import { v4 as uuidv4 } from 'uuid';

function LandingCarousel({ citiesDisplayed }) {

  const cities = [
      {
        name: 'ROTTERDAM',
        logo: LogoRot,
        status: 'coming soon'
      },
      {
        name: 'UTRECHT',
        logo: LogoUtr,
        status: 'coming soon'
      },
      {
        name: 'NEW YORK',
        logo: LogoNyc,
        status: 'coming soon'
      },
      {
        name: 'ANTWERP',
        logo: LogoNyc,
        status: 'coming soon'
      },
      {
        name: 'BERLIN',
        logo: LogoNyc,
        status: 'coming soon'
      },
      {
        name: 'GRONINGEN',
        logo: LogoGrunn,
        status: 'coming soon'
      }
  ];

  function citiesToDisplay(citiesPerRow) {
    let count = 0;
    let row = 0;
    let citiesList = [[]]

    for(let i = 0; i < cities.length; i++) {
      let city = cities[i];
      console.log('Looping:', city)

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
    console.log('Returning new List: ',citiesList)
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
          <div className="city-name catcall-font"><i className="fas fa-map-marker-alt"></i> {city.name}</div>
          <p className="city-description">{city.status}</p>
          {/* <div className="city-description">{city.status}</div> */}
        </div>
      </div >
    )
  }

  const citiesInRows = citiesToDisplay(citiesDisplayed);
  console.log('Cities In Rows:',citiesInRows);

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
