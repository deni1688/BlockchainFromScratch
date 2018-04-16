const Block = require('./block');

class Blockchain {
    constructor() {
        this.chain = [Block.genesis()];
    }

    addBlock(data) {
        const block = Block.mineBlock(this.chain[this.chain.length - 1], data);
        this.chain.push(block);
        
        return block
    }

    isValidChain(chain){
        /**
        * Validate that the first block in the chain
        * is the same as the genesis block.
        */
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;

        for(let i=1; i<chain.length; i++){
            const block = chain[i];
            const lastBlock  = chain[i-1];
            /**
             * Validate that last hash and current hash are the same
             * and that current hash and replacted hash from current block are the same
             */
            if (block.lastHash !== lastBlock.hash || block.hash !== Block.blockHash(block)) return false;
        }
        return true;
    }

    replaceChain(newChain){
        /**
         * Validate that the incoming chain is longer than the current chain
         */
        if(newChain.length <= this.chain.length){
            console.log('Incoming chain is not long enought to replace current chain');
            return;
        } else if(!this.isValidChain(newChain)){
            console.log('Incoming chain is not a valid chain');
            return;
        }
        /**
         * If valid chain replacing current chain
         */
        this.chain = newChain;
        console.log('Replacing current chain with new chain');

    }
}

module.exports = Blockchain;