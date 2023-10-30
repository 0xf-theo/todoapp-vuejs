"use strict";

//ce module offre une fonction de validation qui peut être utilisée pour valider des données par rapport à un schéma Joi. 
//Si les données ne correspondent pas aux règles du schéma, une erreur est générée avec un message d'erreur indiquant la 
//première erreur de validation rencontrée. Cela peut être utile pour garantir que les données entrantes dans votre application 
//sont conformes à des règles spécifiques définies par le schéma.

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
