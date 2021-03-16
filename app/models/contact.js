const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: String,
    index: true
  },
  msg: {
    type: String
  }
}, { timestamps: true });

ContactSchema.virtual('date')
  .get(() => this._id.getTimestamp());

mongoose.model('Contact', ContactSchema);

