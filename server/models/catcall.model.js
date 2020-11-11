const mongoose = require('./index');

const catcallSchema = new mongoose.Schema({
  type: String,
  geometry: {
      type: {
          type: String,
          enum: ['Point'],
          required: true
      },
      coordinates: {
          type: [Number], //a list of numbers
          required: true
      }
  },
  properties: {
      quote: {
        type: String,
        required: true
      },
      context: String,
      dateCatcall: Date,
      dateAdded: {
        type: Date,
        required: true
      },
      url: String,
      verified: {
          type: Boolean,
          default: false
      },
      chalked: {
          type: Boolean,
          default: false
      },
      listedForChalk: {
          type: Boolean,
          default: false
      },
      starred: {
          type: Boolean,
          default: false
      },
      trash: {
          type: Boolean,
          default: false
      }
  }
})

module.exports = mongoose.model('Catcall', catcallSchema);