const dgram = require('dgram');
var now=new Date().getTime();
now='00.123'
const message = Buffer.from(`LANE 2  ${now} SEC`);
const client = dgram.createSocket('udp4');
client.send(message, 41234, 'localhost', (err) => {
  client.close();
});
