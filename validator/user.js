import { Validator } from 'jsonschema';

const verifyUser = (user) => {
  if (!user) {
    throw new Error('Cannot create new user');
  }
  let validator = new Validator();
  let userSchema = {
    type: 'object',
    properties: {
      firstname: {
        type: 'string',
        minLength: 3,
        errorMessage: 'Provide FirstName is invalid'
      },
      lastname: {
        type: 'string',
        minLength: 3,
        errorMessage: 'Provide LastName is invalid'
      },
      email: {
        type: 'string',
        format: 'email',
        errorMessage: 'Provide Email is invalid'
      },
      password: {
        type: 'string',
        minLength: 6,
        errorMessage: 'Provide Password is invalid',
        pattern: '^(?=.*[A-Z])(?=.*[0-9]).+$'
      }
    },
    require: ['firstname', 'lastname', 'email', 'password']
  };

  let result = validator.validate(user, userSchema);

  if (result.errors.length) {
    const errorInputsMsg = result.errors
      .map((error) => {
        return error.schema.errorMessage || error.message;
      })
      .join(' ');

    throw new Error(errorInputsMsg);
  }
};

export default verifyUser;
