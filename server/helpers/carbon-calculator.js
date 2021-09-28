/* eslint-disable no-restricted-properties */
/* eslint-disable max-len */
/* eslint-disable quote-props */
const chalk = require('chalk');
const { coordinates } = require('./coordinates');

const carbonCalculator = (upc) => {
  const key = upc.toString().substring(0, 3);
  console.log('key', key);

  console.log('THESE ARE THE COORDINATES: ', coordinates[key]);

  if (!coordinates[key]) {
    console.log(chalk.red('@@@@@@@@@@@@@@ UPC data missing!', key));
    return ({
      lat: 0,
      long: 0,
      co2: 0,
    });
  }
  const origin = {
    lat: 49.2827 * (Math.PI / 180),
    long: (360 - 123.1207) * (Math.PI / 180),
  };
  const originZ = Math.cos(origin.lat) * Math.cos(origin.long) * 3;
  const originX = Math.cos(origin.lat) * Math.sin(origin.long) * 3;
  const originY = Math.sin(origin.lat) * 3;

  const pointZ = Math.cos(coordinates[key].lat * (Math.PI / 180)) * Math.cos(coordinates[key].long * (Math.PI / 180)) * 3;
  const pointX = Math.cos(coordinates[key].lat * (Math.PI / 180)) * Math.sin(coordinates[key].long * (Math.PI / 180)) * 3;
  const pointY = Math.sin(coordinates[key].lat * (Math.PI / 180)) * 3;

  const disX = Math.pow((originX - pointX), 2);
  const disY = Math.pow((originY - pointY), 2);
  const disZ = Math.pow((originZ - pointZ), 2);

  const distance = Math.sqrt((disX + disY + disZ)) * 6378;

  const carbonEmissions = (distance * 115) / 68;
  console.log('TOTAL CARBON EMISSIONS : ', carbonEmissions);

  const returnObject = {
    lat: coordinates[key].lat,
    long: coordinates[key].long,
    co2: carbonEmissions,
  };

  return returnObject;
};

module.exports = { carbonCalculator };
