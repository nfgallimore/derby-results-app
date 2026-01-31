/**
 * Electron Preload Script
 * Initializes UDP server on port 41234 to receive timing data from DerbyAppTimeProc.
 * Parses incoming messages for lane number and race time, then dispatches a 'udpTimer'
 * event to the DOM element #udpTimerSpan for display in the web application.
 */

function udpInit() {
    const dgram = require('dgram');
    const server = dgram.createSocket('udp4');

    server.on('error', (err: any) => {
        console.error(`[UDP ERROR] ${err.message}`, err.stack);
        server.close();
    });

    server.on('message', (msg: any, rinfo: any) => {
        const msgString = msg.toString('utf8');
        console.log(`[UDP RECEIVED] "${msgString}" from ${rinfo.address}:${rinfo.port}`);

        // Parse message for lane and time
        const regexp = /lane\s*(\d)\s+(\d+\.\d+)/i;
        const found = msgString.match(regexp);

        const udpTimerSpan = document.getElementById('udpTimerSpan');

        if (found && found.length > 2) {
            console.log(`[UDP PARSED] Lane: ${found[1]}, Time: ${found[2]}`);

            if (udpTimerSpan) {
                const ms = found[2].replace('.', '');
                const detailObject = {
                    lane: found[1],
                    ms: ms,
                };
                console.log(`[UDP EVENT] Dispatching udpTimer event:`, detailObject);
                const event = new CustomEvent('udpTimer', {
                    detail: JSON.stringify(detailObject),
                });
                udpTimerSpan.dispatchEvent(event);
            } else {
                console.warn('[UDP WARNING] Cannot find udpTimerSpan element in DOM');
            }
        } else {
            console.warn(`[UDP PARSE ERROR] Invalid message format: "${msgString}"`);
        }
    });

    server.on('listening', () => {
        const address = server.address();
        console.log(`[UDP SERVER] Listening on ${address.address}:${address.port}`);
    });

    server.bind(41234);
}

udpInit();
