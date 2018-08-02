var expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

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
describe('generateLocationMessage', ()=>{
    it('should generate a location', ()=>{
        let from = 'a';
        let lat = 123;
        let long = 123;
        let obj = generateLocationMessage(from, lat, long);
        expect(obj.url).toBe(`https://www.google.com/maps?q=${lat},${long}`)
    })
})