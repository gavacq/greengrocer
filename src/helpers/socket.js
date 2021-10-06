const io = require('socket.io-client');

const socket = io('https://greengrocer.me', {
  path: '/ws',
});
export default socket;
