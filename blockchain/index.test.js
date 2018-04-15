const Block = require('./block');
const Blockchain = require('./index');

describe('Blockchain', () => {
    let bc, bc2;

    beforeEach(() => {
        bc = new Blockchain();
        bc2 = new Blockchain();
    });

    it('blockchain starts with genesis block', () => {
        expect(bc.chain[0]).toEqual(Block.genesis());
    });

    it('adds new block to blockchain', () => {
        const data = 'foo';
        bc.addBlock(data);
        expect(bc.chain[bc.chain.length-1].data).toEqual(data);
    });

    it('validates a chain', () => {
        bc2.addBlock('foo');
        expect(bc.isValidChain(bc2.chain)).toBe(true);  
    });

    it('invalidates a chain with a corrupt genesis block', () => {
        bc2.chain[0].data = 'currupt data';
        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });

    it('invalidates a corrupt chain', () => {
        bc2.addBlock('initial data');
        bc2.chain[1] = 'changed data';
        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });

    it('replaces current chain with valid new chain', () => {
        bc2.addBlock('goo');
        bc.replaceChain(bc2.chain);
        expect(bc.chain).toEqual(bc2.chain);
    });

    it('does not replace a chain with a incoming chain that is of equal or shorter length', () => {
        bc.addBlock('foo');
        bc.replaceChain(bc2.chain);
        expect(bc.chain).not.toEqual(bc2.chain);
    });
});