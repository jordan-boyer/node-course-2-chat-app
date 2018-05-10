const expect = require('expect');
const {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        res = generateMessage('admin', 'easy');
        expect(res.from).toBe('admin');
        expect(res.text).toBe('easy');
        expect(typeof res.createdAt).toBe('number');
    });
})