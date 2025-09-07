const request = require('supertest');

const mongoose = require('../../config/config');
const server = require('../../app');
const Book = require('../../src/api/resources/books/books.model.js')

afterEach(async () => {
    await Book.deleteMany({});
})

afterAll(async ()=> {
    await Book.deleteMany({});
    server.close();
    await mongoose.disconnect();
})

describe('getBook', () => {
    test('should return 200 and get book from db', async ()=> {
        const book = await Book.create({title: 'MyBook'})
        const res = await request(server).get(`/api/books/${book.id}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toMatch('book retrieved successfully')
        expect(res.body.data.book).toMatchObject({title: 'MyBook'})
    });
    test('should return 404 if book not found', async () => {
        const res = await request(server).get('/api/books/68b5bee0f3cde2f8de0363f9');
        expect(res.status).toBe(404);
        expect(res.body.message).toMatch('404 not found');
    });
});


describe('updateBook', () => {
    it('should return 404 if book not found', async () => {
        const res = await request(server).put('/api/books/68b5bee0f3cde2f8de0363f9');
        expect(res.status).toBe(404);
        expect(res.body.message).toMatch('404 not found')
    });

    it('should return 200 and update the Book', async () => {
        const book = await Book.create({title: 'MyBook'});
        const res = await request(server).put(`/api/books/${book.id}`)
        .send({title: 'MyBook Updated'});
        expect(res.status).toBe(200);
        expect(res.body.message).toMatch('book updated successfully')
        expect(res.body.data.book).toMatchObject({title: 'MyBook Updated'})

    });
});

describe('deleteBook', () => {
    it('should return 200 and delete the Book', async () => {
        const book = await Book.create({title: 'MyBook'});
        const res = await request(server).delete(`/api/books/${book.id}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toMatch('deleted successfully')
    });
});

