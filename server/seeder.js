const dotenv = require('dotenv').config();
const path = require('path');
const { Seeder } = require('mongo-seeding');

const config = {
  database: process.env.DB_URL,
  dropDatabase: true,
};

const seeder = new Seeder(config);
const collections = seeder.readCollectionsFromPath(
  path.resolve('./data'),
  {
    transformers: [Seeder.Transformers.replaceDocumentIdWithUnderscoreId],
  },
);

seeder
  .import(collections)
  .then(() => {
    console.log('Success');
  })
  .catch(err => {
    console.log('Error', err);
  });