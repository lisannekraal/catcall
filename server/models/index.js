const mongoose = require('mongoose');

const url = process.env.DB_URL;
// process.env.DB_ATLAS_URL ||

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

module.exports = mongoose;