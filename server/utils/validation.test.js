const expect = require('expect');

const { isRealString } = require('./validation');

describe('Validation', () => {
    it('should reject non-string values', () => {
        const result = isRealString(123);
        expect(result).toBeFalsy();
    })

    it('should reject string with only spaces', () => {
        const result = isRealString('         ');
        expect(result).toBeFalsy();
    })

    it('should allow string with non-space characters', () => {
        const result = isRealString('  lotr  ');
        expect(result).toBeTruthy();      
    })
})