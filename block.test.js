const Block = require('./block');

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
});