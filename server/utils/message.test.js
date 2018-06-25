const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        const from = 'Q';
        const text = 'ciao';
        const message = generateMessage(from, text);
        expect(message.from).toEqual(from);
        expect(message.text).toEqual(text);
        expect(typeof message.createdAt).toBe('number');
    })
})

describe('generateLocationMessage', () => {
    it('should generate correct location message object', () => {
        const from = 'A'
        const lat = 12;
        const lon = 15;
        const url = 'https://www.google.com/maps?q=12,15';
        const message = generateLocationMessage(from, lat, lon);
        expect(message).toHaveProperty('from', from);
        expect(message).toHaveProperty('url', url);
        expect(typeof message.createdAt).toBe('number');
    })
})