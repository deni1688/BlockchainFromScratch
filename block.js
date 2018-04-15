const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(timestamp, lastHash, hash, data){
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
    }

    toString() {
        return `Block - 
            Timestamp: ${this.timestamp}
            Last Hash: ${this.lasthash.substring(0, 10)}
            Hash:      ${this.hash.substring(0, 10)}
            Data:      ${this.data}`
    }

    static genesis() {
        return new this('Genesis Time', '-----', 'f120-1d9d', []);
    }

    static mineBlock(lastBlock, data) {
        const timestamp = Date.now();
        const lastHash = lastBlock.hash;
        const hash = Block.hash(timestamp, lastHash, data);

        return new this(timestamp, lastHash, hash, data)
    }

    static hash(timestamp, hash, data) {
        return SHA256(`${timestamp}${hash}${data}`).toString();
    }
}

module.exports = Block;