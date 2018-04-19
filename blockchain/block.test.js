const Block = require('./block');
const { DIFFICULTY } = require('../config');

describe('Block', () => {
    let data, lastBlock, block;

    beforeEach(() => {
        data = 'bar';
        lastBlock = Block.genesis();
        block = Block.mineBlock(lastBlock, data);
    });

    it('sets data to given input', () => {
        expect(block.data).toEqual(data);
    });

    it('sets lastHash to given hash from last block', () => {
        expect(block.lastHash).toEqual(lastBlock.hash);
    });

    it('generates hash that matches difficulty', () => {
        expect(block.hash.substring(0, DIFFICULTY)).toEqual('0'.repeat(DIFFICULTY));
    });
});