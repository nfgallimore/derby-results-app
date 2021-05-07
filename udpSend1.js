const dgram = require('dgram');
var ms=2222
const message = Buffer.from(`LanE 1  ${ms}`);
const client = dgram.createSocket('udp4');
client.send(message, 41234, 'localhost', (err) => {
  client.close();
});
