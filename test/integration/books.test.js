require('../../config/config')

const mongoose = require('../../config/config');
const booksService = require('../../src/api/resources/books/books.service')
const Book = require('../../src/api/resources/books/books.model')

beforeEach(async () => {
    await Book.deleteMany({});
})

afterAll(async () => {
    await Book.deleteMany({});
    await mongoose.disconnect()
})

describe('getBooks', ()=> {
    it('should return empty array', async ()=> {
        const books = await booksService.getBooks();
        expect(books.length).toBe(0);
    })

    it('should return 2 books', async () => {
        await Book.insertMany([{title: 'Book1'}, {title: 'Book2'}])
        const books = await booksService.getBooks();
        expect(books.length).toBe(2);
        expect(books[0]).toMatchObject({title : 'Book1'});
        expect(books[1]).toMatchObject({title : 'Book2'});

    })

});

describe('createBook', () => {
    it('should create book with title Java', async () => {
        await booksService.createBook({ title: 'Java' });
        const books = await Book.find({})
        expect(books.length).toBe(1)
        expect(books[0]).toMatchObject({ title: 'Java' })
    });
});
