const io = require('socket.io-client');

let ORIGIN_URL = '';
if (process.env.NODE_ENV === 'production') {
  console.log('Running in production!');
  ORIGIN_URL = 'greengrocer-app.herokuapp.com';
} else {
  console.log('Running in development!');
  ORIGIN_URL = 'localhost:8081';
}
const socket = io(ORIGIN_URL);

export default socket;
