const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        res = generateMessage('admin', 'easy');
        expect(res.from).toBe('admin');
        expect(res.text).toBe('easy');
        expect(typeof res.createdAt).toBe('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        res = generateLocationMessage('admin', 1, 1);
        expect(res.from).toBe('admin');
        expect(res.url).toBe('https://www.google.com/maps?q=1,1');
        expect(typeof res.createdAt).toBe('number');
    });
});