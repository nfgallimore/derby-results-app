const dgram = require('dgram');
const now=new Date().getTime();
const message = Buffer.from(`Some bytes ${now}`);
const client = dgram.createSocket('udp4');
client.send(message, 41234, 'localhost', (err) => {
  client.close();
});
