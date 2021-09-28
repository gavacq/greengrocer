const coordinates = require('./coordinates');

const carbonCalculator = (upc) => {
  const key = upc.toString().substring(0, 3);
  return coordinates[key];
}

module.exports = {carbonCalculator}