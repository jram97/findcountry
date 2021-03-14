const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CountrySchema = new Schema({
  name: {
    type: String
  },
  flag: {
    type: String
  },
  iso2: {
    type: String,
    index: true
  },
  iso3: {
    type: String
  },
  isoNumeric: {
    type: String
  },
  geoNameId: {
    type: String
  },
  phoneCode: {
    type: String
  },
  continent: {
    type: String
  },
  capital: {
    type: String
  },
  currency: {
    type: String
  },
  about: {
    type: String
  }
});

CountrySchema.virtual('date')
  .get(() => this._id.getTimestamp());

mongoose.model('Country', CountrySchema);

