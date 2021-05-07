const dgram = require('dgram');
var now=new Date().getTime();
now=123
const message = Buffer.from(`LanE 2  ${now}`);
const client = dgram.createSocket('udp4');
client.send(message, 41234, 'localhost', (err) => {
  client.close();
});
