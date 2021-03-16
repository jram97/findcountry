var timeago = require('timeago.js');
var timeagoInstance = timeago;

const helpers = {};

helpers.textFormat = (text) => (text == "1") ? "Visible" : "Hidden";

helpers.timeago = (savedTimestamp) => timeagoInstance.format(savedTimestamp);


module.exports = helpers;