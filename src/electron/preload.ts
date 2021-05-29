function udpInit(){
        const dgram = require('dgram');
        const server = dgram.createSocket('udp4');

        server.on('error', (err: any) => {
          console.log(`server error:\n${err.stack}`);
          server.close();
        });

        server.on('message', (msg: any, rinfo: any) => {
          console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
	  const msgString = msg.toString('utf8');
	  let regexp = /lane\s*(\d)\s+(\d+\.\d\d\d)/i;
	  const found=msgString.match(regexp);
	  
	

          var udpTimerSpan = document.getElementById("udpTimerSpan");
	  if(found && found.length>2){
		  console.log("Found:", found.length);
	  }
	  else{
		  console.log(`invalid timer msg: ${msgString}`);
		return;
	  }
	  if(udpTimerSpan){
		  const ms=found[2].replace(".","");
	          const detailObject={
			lane: found[1],
			ms: ms,
		  };
		  console.log(`server sending ${JSON.stringify(detailObject)} via ${udpTimerSpan}`);
		  const event = new CustomEvent('udpTimer', { detail: JSON.stringify(detailObject)});
		  udpTimerSpan.dispatchEvent(event);
	}
	else{
		  console.log(`cannot find transport element!`);
	}

  	  //eWindow.webContents.send('targetPriceVal', msg)

        });

        server.on('listening', () => {
          const address = server.address();
          console.log(`server listening ${address.address}:${address.port}`);
        });

        server.bind(41234);
        // Prints: server listening 0.0.0.0:41234
}
udpInit();
