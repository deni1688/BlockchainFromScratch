const Websocket = require('ws');

const P2P_PORT = process.env.P2P_PORT || 5001;
const peers = process.env.PEERS 
    ? process.env.PEERS.split(',') 
    : [];

class P2pServer {
    constructor(blockchain) {
        this.blockchain = blockchain;
        this.sockets = [];
    }

    listen() {
        /**
         * Create new socket server 
         * Listen for incomming p2p conncetions
         */
        const server = new Websocket.Server({ port: P2P_PORT });
        server.on('connection', socket => this.connectSocket(socket));

        this.connectToPeers();
        console.log(`listening for peer-to-peer connections on port: ${P2P_PORT}`);
    }

    connectToPeers() {
        peers.forEach( peer => {
            // peer example: ws://localhost:5001
            const socket = new Websocket(peer);

            socket.on('open', () => this.connectSocket(socket));
        });
    }

    connectSocket(socket) {
        /**
         * Add new socket connection to sockets array
         */
        this.sockets.push(socket);
        console.log('socket connected')
    }
}

module.exports = P2pServer;