// ******************************************************************
// Format keyword
// ******************************************************************

var Errors = require('../../../../errors.js')
  , core = require('../../core.js')
  ;

module.exports = function(config) {
  var errors = [];
  var valid = false;

  var match = config.inst.match(core.FORMAT_REGEXPS.date);

  if (match) {
    var year = parseInt(match[1], 10);
    var month = parseInt(match[2], 10);
    var mday = parseInt(match[3], 10);

    if (
        month >= 1 && month <= 12 &&
        mday >= 1 && mday <= 31
       )
    {
      var d = new Date("0000-01-01T00:00:00.000Z"); // Initialize a date in UTC time
      d.setUTCFullYear(year);
      d.setUTCMonth((month - 1) + 1); // the next month
      var lastDay = new Date(d - 86400000); // the day before

      if (mday <= lastDay.getUTCDate()) {
        // [day-of-month is valid]
        valid = true;
      }
    }
  }

  if (!valid) {
    var desc = 'not a valid date';
    errors.push(new Errors.FormatValidationError(config.resolutionScope,
      config.instanceContext, 'format', 'date', config.inst, desc));
  }

  return errors;
};

