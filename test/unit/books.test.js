const booksController = require('../../src/api/resources/books/books.controller');
const booksService = require('../../src/api/resources/books/books.service');

jest.mock('../../src/api/resources/books/books.service'); // نعمل mock للـ service

// mock response object
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Books Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getBooks', () => {
    it('should return all books successfully', async () => {
      const req = {};
      const res = mockResponse();
      const books = [{ id: 1, title: 'Book 1' }];
      booksService.getBooks.mockResolvedValue(books);

      await booksController.getBooks(req, res);

      expect(booksService.getBooks).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({
        message: 'books retrieved successfully',
        data: { books }
      });
    });

    it('should handle errors', async () => {
      const req = {};
      const res = mockResponse();
      booksService.getBooks.mockRejectedValue(new Error('DB error'));

      await booksController.getBooks(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'failed to get books' });
    });
  });

  describe('getBook', () => {
    it('should return book successfully', async () => {
      const req = { params: { id: 1 } };
      const res = mockResponse();
      const book = { id: 1, title: 'Book 1' };
      booksService.getBook.mockResolvedValue(book);

      await booksController.getBook(req, res);

      expect(res.json).toHaveBeenCalledWith({
        message: 'book retrieved successfully',
        data: { book }
      });
    });

    it('should return 404 if book not found', async () => {
      const req = { params: { id: 1 } };
      const res = mockResponse();
      booksService.getBook.mockResolvedValue(null);

      await booksController.getBook(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: '404 not found' });
    });
  });

  describe('createBook', () => {
    it('should create a book successfully', async () => {
      const req = { body: { title: 'New Book', description: 'desc', price: 10 } };
      const res = mockResponse();
      const book = { id: 1, ...req.body };
      booksService.createBook.mockResolvedValue(book);

      await booksController.createBook(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'book created successfully',
        data: { book }
      });
    });

    it('should return 400 if title missing', async () => {
      const req = { body: { description: 'desc', price: 10 } };
      const res = mockResponse();

      await booksController.createBook(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: '400 invalid request, title is required'
      });
    });
  });

  describe('updateBook', () => {
    it('should update a book successfully', async () => {
      const req = { params: { id: 1 }, body: { title: 'Updated' } };
      const res = mockResponse();
      const book = { id: 1, title: 'Old' };
      const updatedBook = { id: 1, title: 'Updated' };

      booksService.getBook.mockResolvedValue(book);
      booksService.updateBook.mockResolvedValue(updatedBook);

      await booksController.updateBook(req, res);

      expect(res.json).toHaveBeenCalledWith({
        message: 'book updated successfully',
        data: { book: updatedBook }
      });
    });

    it('should return 404 if book not found', async () => {
      const req = { params: { id: 99 }, body: { title: 'Updated' } };
      const res = mockResponse();
      booksService.getBook.mockResolvedValue(null);

      await booksController.updateBook(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: '404 not found' });
    });
  });

  describe('deleteBook', () => {
    it('should delete a book successfully', async () => {
      const req = { params: { id: 1 } };
      const res = mockResponse();
      const book = { id: 1, title: 'Book' };

      booksService.getBook.mockResolvedValue(book);
      booksService.deleteBook.mockResolvedValue();

      await booksController.deleteBook(req, res);

      expect(res.json).toHaveBeenCalledWith({
        message: 'book deleted successfully'
      });
    });

    it('should return 404 if book not found', async () => {
      const req = { params: { id: 99 } };
      const res = mockResponse();
      booksService.getBook.mockResolvedValue(null);

      await booksController.deleteBook(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: '404 not found' });
    });
  });
});