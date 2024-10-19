import { Validator } from 'jsonschema';

const verifyCv = (cv) => {
  if (!cv) {
    throw new Error('Cannot create new CV');
  }
  let validator = new Validator();
  let cvSchema = {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        minLength: 3,
        errorMessage: 'Provided Name is invalid'
      },
      description: {
        type: 'string',
        minLength: 3,
        errorMessage: 'Provided Description is invalid'
      },
      isPublic: {
        type: 'boolean',
        errorMessage: 'Provided isPublic is invalid'
      },
      educationalExperiences: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              minLength: 3,
              errorMessage: 'Provided Educational Experience Name is invalid'
            },
            description: {
              type: ['string', 'null'],
              minLength: 3,
              errorMessage: 'Provided Educational Experience Description is invalid',
              nullable: true
              
            },
            startDate: {
              type: 'string',
              format: 'date',
              errorMessage: 'Provided Educational Experience Start Date is invalid'
            },
            endDate: {
              type: ['string', 'null'],
              format: 'date',
              errorMessage: 'Provided Educational Experience End Date is invalid',
              nullable: true
            }
          },
          required: ['name', 'startDate']
        }
      },
      professionalExperiences: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              minLength: 3,
              errorMessage: 'Provided Professional Experience Name is invalid'
            },
            description: {
              type: ['string', 'null'],
              minLength: 3,
              errorMessage: 'Provided Professional Experience Description is invalid',
              nullable: true
            },
            startDate: {
              type: 'string',
              format: 'date',
              errorMessage: 'Provided Professional Experience Start Date is invalid'
            },
            endDate: {
              type: ['string', 'null'],
              format: 'date',
              errorMessage: 'Provided Professional Experience End Date is invalid',
              nullable: true
            }
          },
          required: ['name', 'startDate']
        }
      }
    },
    required: []
  };

  let result = validator.validate(cv, cvSchema);

  if (result.errors.length) {
    console.log(result.errors)
    const errorInputsMsg = result.errors
      .map((error) => {
        return error.schema.errorMessage || error.message;
      })
      .join(' ');

    throw new Error(errorInputsMsg);
  }
};

export default verifyCv;