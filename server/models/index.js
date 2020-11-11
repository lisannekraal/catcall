const mongoose = require('mongoose');

const url = process.env.DB_URL;

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

module.exports = mongoose;