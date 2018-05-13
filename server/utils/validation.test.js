const expect = require('expect');
const {isRealString} = require('./validation');

describe("isRealString", () => {
    it('should reject not-string values', () => {
        expect(isRealString(15)).toBeFalsy();
    });

    it ('should reject string with only spaces', () => {
        expect(isRealString('           ')).toBeFalsy();
    });

    it('shoul allow string with non-space characters', () => {
        expect(isRealString('       toto at toto          ')).toBeTruthy();
    })
});