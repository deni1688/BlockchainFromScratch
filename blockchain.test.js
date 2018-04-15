const Block = require('./block');
const Blockchain = require('./blockchain');

describe('Blockchain', () => {
    let bc;

    beforeEach(() => {
        bc = new Blockchain();
    });

    it('blockchain starts with genesis block', () => {
        expect(bc.chain[0]).toEqual(Block.genesis());
    });

    it('adds new block to blockchain', () => {
        const data = 'foo';
        bc.addBlock(data);
        expect(bc.chain[bc.chain.length-1].data).toEqual(data);
    });
});