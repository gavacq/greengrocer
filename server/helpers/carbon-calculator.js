/* eslint-disable max-len */
const chalk = require('chalk');
const { coordinates, randomizerCoordinates } = require('./coordinates');

const randomizeCoords = () => {
  const key = Math.floor((Math.random() * 100) % 21);
  return { lat: randomizerCoordinates[key].lat, long: randomizerCoordinates[key].long };
};

const getDestCoords = (upc) => {
  if (!upc) {
    console.log(chalk.red('@@@@@@@@@@@@@@ UPC code (null) doesnt exist'));
    return randomizeCoords();
  }

  const key = upc.toString().substring(0, 3);
  console.log('key', key);
  if (!coordinates[key]) {
    console.log(chalk.red('@@@@@@@@@@@@@@ UPC data missing from coordinates obj', key));
    const dest = randomizeCoords();
    return dest;
  }

  // randomize coords for any product with USA upc
  if (Number(key) >= 0 && Number(key) <= 99) {
    return randomizeCoords();
  }

  return { lat: coordinates[key].lat, long: coordinates[key].long };
};

const carbonCalculator = (upc) => {
  const origin = {
    lat: 49.2827 * (Math.PI / 180),
    long: (360 - 123.1207) * (Math.PI / 180),
  };

  const dest = getDestCoords(upc);
  console.log('Destination coordinates', dest);

  const originZ = Math.cos(origin.lat) * Math.cos(origin.long) * 6378;
  const originX = Math.cos(origin.lat) * Math.sin(origin.long) * 6378;
  const originY = Math.sin(origin.lat) * 6378;

  const destZ = Math.cos(dest.lat * (Math.PI / 180)) * Math.cos(dest.long * (Math.PI / 180)) * 6378;
  const destX = Math.cos(dest.lat * (Math.PI / 180)) * Math.sin(dest.long * (Math.PI / 180)) * 6378;
  const destY = Math.sin(dest.lat * (Math.PI / 180)) * 6378;

  const disX = (originX - destX) ** 2;
  const disY = (originY - destY) ** 2;
  const disZ = (originZ - destZ) ** 2;

  const distance = Math.sqrt((disX + disY + disZ));

  // TODO: specify weight of item for more accurate carbon value
  const carbonEmissions = Math.trunc((distance * 115) / 68 / 1000);
  console.log('Total carbon emissions', carbonEmissions);

  const returnObject = {
    lat: dest.lat,
    long: dest.long,
    co2: carbonEmissions,
  };

  return returnObject;
};

module.exports = { carbonCalculator };
