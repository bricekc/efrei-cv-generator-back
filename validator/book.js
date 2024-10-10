import { Validator } from 'jsonschema';

const verifyBook = (book) => {
  if (!book) {
    throw new Error('Cannot create new book');
  }
  let validator = new Validator();
  let bookSchema = {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        minLength: 3,
        errorMessage: 'Provide Name is invalid'
      },
      description: {
        type: 'string',
        minLength: 3,
        errorMessage: 'Provide Description is invalid'
      },
      author: {
        type: 'string',
        minLength: 1,
        errorMessage: 'Provide AuthorId is invalid'
      }
    },
    require: ['name', 'author']
  };

  let result = validator.validate(book, bookSchema);

  if (result.errors.length) {
    const errorInputsMsg = result.errors
      .map((error) => {
        return error.schema.errorMessage || error.message;
      })
      .join(' ');

    throw new Error(errorInputsMsg);
  }
};

export default verifyBook;
