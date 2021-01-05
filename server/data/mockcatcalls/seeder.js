const { getObjectId } = require("mongo-seeding");
// const catcalls = ["John", "Joanne", "Bob", "Will", "Chris", "Mike", "Anna", "Jack", "Peter", "Paul"];
// const min = 18;
// const max = 100;
const faker = require('faker/locale/en_GB');
let catcall = {
  "geometry": {
    "coordinates": [Number(faker.address.latitude()),Number(faker.address.longitude())],
    "type": "Point",
  },
  "type": "Feature",
  "properties": {
    "quote": `${faker.random.number()}`,
    "context": faker.lorem.sentence(),
    "dateCatcall": `${Date.parse(faker.date.past())}`,
    "dateAdded":  `${Date.parse(faker.date.recent())}`,
    "url": "",
    "verified": false,
    "chalked": false,
    "listedForChalk": false,
    "starred": false,
    "trash": false
  }
}

 module.exports = catcall;

//