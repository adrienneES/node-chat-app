var expect = require('expect');

const {generateMessage} = require('./message');

describe('generateMessage', ()=>{
    it('should generate the corret message object', ()=>{
        let from = 'a';
        let text = 'text';
        let obj = generateMessage(from,text);
        expect(obj.from).toBe(from);
        expect(obj.text).toBe(text);
        expect(typeof obj.createdAt).toBe('number');
    });
});