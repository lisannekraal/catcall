const { getObjectId } = require("mongo-seeding");
const faker = require('faker/locale/en_GB');
const numCatcalls = 10;

function getRandomInRange(from, to, fixed) {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

let catcalls = [...Array(numCatcalls)].map(() => (
  {
    "geometry": {
      "coordinates": [ getRandomInRange(4.8, 5, 3), getRandomInRange(52.3, 52.4, 3)],
      "type": "Point",
    },
    "type": "Feature",
    "properties": {
      "quote": `${faker.random.number()}`,
      "context": faker.lorem.paragraph(),
      "dateCatcall": `${Date.parse(faker.date.past())}`,
      "dateAdded": `${Date.parse(faker.date.recent())}`,
      "url": "",
      "verified": true,
      "chalked": false,
      "listedForChalk": false,
      "starred": false,
      "trash": false,
      "categories": []
    }
  }
));

module.exports = catcalls;

//