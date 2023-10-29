"use strict";

const validateSchema = (schema, data) => {
  const result = schema.validate(data, {
    errors: { wrap: { label: false } },
  });

  if (result.error) {
    throw new Error(result.error.details[0].message);
  }
};

module.exports = {
  validateSchema,
};
