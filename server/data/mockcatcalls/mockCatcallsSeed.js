const { getObjectId } = require("mongo-seeding");
const faker = require('faker/locale/en_GB');
const numCatcalls = 10;

let catcalls = [...Array(numCatcalls)].map(() => (
  {
    "geometry": {
      "coordinates": [ Number(faker.address.longitude()), Number(faker.address.latitude())],
      "type": "Point",
    },
    "type": "Feature",
    "properties": {
      "quote": `${faker.random.number()}`,
      "context": faker.lorem.paragraph(),
      "dateCatcall": `${Date.parse(faker.date.past())}`,
      "dateAdded": `${Date.parse(faker.date.recent())}`,
      "url": "",
      "verified": false,
      "chalked": false,
      "listedForChalk": false,
      "starred": false,
      "trash": false
    }
  }
));

module.exports = catcalls;

//