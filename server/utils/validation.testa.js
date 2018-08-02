const expect = require('expect');
const {isRealString} = require('./validation');

describe('test of string valudation', ()=>{
    it ('should pass a valid string', ()=>{
        expect(isRealString('abc7')).toBe(true);
    });
    it ('should not pass an invalid string', ()=>{
        expect(isRealString('   ')).toBe(false);
    });
    it ('should not pass if number passed in', ()=>{
        expect(isRealString('7')).toBe(false);
    });
})