# Catcalls of Amsterdam

An application to visualize, report and manage data on catcalling. Made for @CatcallsofAms, a local Instagram-based initiative part of a global 'chalk back' movement. In over a 150 cities wordwide, young girls are fighting street harassment by literally chalking catcalls on the sidewalk and raise awareness. More about this, check out https://www.instagram.com/catcallsofams/ and https://www.chalkback.org/.

Launch test version: January 2021

# Main features

## Data visualization on a map

Using Mapbox' open source API, a interactive map display the catcalls of the database and allows users to zoom, pan and interact with the catcalls layer on the map. They can find information for their own neighborhood or favorite parts of the city, read the catcalls and the stories from the victims, and find the related images on Instagram.

## Easy report of new catcalls

It is possible for users to report a catcall anonymously, without an account or personal information. They can provide context information, date of happening and the location. When reported, the catcall will not be shown on the map untill a moderator has validated the report. This is because some reports might contain unwanted details such as personal characteristics of the perpetrator or it could be used with other intentions.

## Managing incoming catcalls by moderators

Moderators are defined by each verified local 'Catcalls of...' organisor, as well as given rights to moderate incoming catcalls and the existing database. Through a moderator dashboard moderators can:
- verify, edit and delete incoming catcalls
- search through and manage the entire database of catcalls
- see a list of catcalls that are staged to be chalked by the organisation
- update catcalls with the chalked image of Instagram

# How to run locally for development purposes

- `yarn install` from main repo, client folder and server folder
- create a `.env` in server folder and save local MongoDB url as DB_URL or MongoDB Atlas url as
DB_ATLAS_URL
- create a `.env` in client folder and define localhost url as REACT_APP_APOLLO_SERVER, add Mapbox access token as REACT_APP_MAPBOX_ACCESS_TOKEN, add personal recaptcha key as REACT_APP_RECAPTCHA_KEY and add `SKIP_PREFLIGHT_CHECK=true`
- In development of client, run `yarn test` to test correct routing, incurrent url and redirects
- In development of server, run `yarn test` to test server resolvers
- `yarn start` in server to start server listening
- `yarn start` in client folder to start React app

# A special thanks to

- [Nikos Cocci](https://github.com/Nik439) and [Alejandro Rene Valdivia](https://github.com/serendatapy) for reviewing and improving the code at an early stage
- [Camille Desoubrie](https://github.com/Kmyll) for help with the logo

# Contribute

I am relatively new to full stack development. So please reach out if you have any advice or would like to contribute.