import { Validator} from 'jsonschema';

const verifyReview = (review) => {
  if (!review) {
    throw new Error('Cannot create new review');
  }
  let validator = new Validator();
  let reviewSchema = {
    type: 'object',
    properties: {
      rating: {
        type: 'number',
        minimum: 1,
        maximum: 5,
        errorMessage: 'Provided Rating is invalid'
      },
      comment: {
        type: 'string',
        minLength: 3,
        errorMessage: 'Provided Description is invalid'
      },
    },
    required: ['rating', 'comment']
  };

  let result = validator.validate(review, reviewSchema);

  if (result.errors.length) {
    const errorInputsMsg = result.errors
      .map((error) => {
        return error.schema.errorMessage || error.message;
      })
      .join(' ');

    throw new Error(errorInputsMsg);
  }
};

export default verifyReview;