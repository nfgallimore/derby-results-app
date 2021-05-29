const dgram = require('dgram');
var ms="00.065"
const message = Buffer.from(`LANE 1  ${ms} sec.`);
const client = dgram.createSocket('udp4');
client.send(message, 41234, 'localhost', (err) => {
  client.close();
});
