const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConfigSchema = new Schema({
  about: {
    type: String
  },
  term: {
    type: String
  },
  fb: {
    type: String
  },
  ins: {
    type: String
  },
  tw: {
    type: String
  },
  yt: {
    type: String
  },
  config: {
      type: String
  },
  text: {
    type: String
  },
  phone: {
    type: String
  },
  dir: {
    type: String
  },
  email: {
    type: String
  }
});

ConfigSchema.virtual('date')
  .get(() => this._id.getTimestamp());

mongoose.model('Config', ConfigSchema);

