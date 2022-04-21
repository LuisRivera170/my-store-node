const Joi = require('joi');

// Documentation - https://joi.dev/api/?v=17.5.0

// Custom error messages
const id = Joi
  .number()
  .integer()
  .messages({
    'number.base': '"id" debe ser de tipo numérico',
    'number.integer': '"id" debe ser un número entero',
    'number.required': '"id" es obligatorio',
    'any.required': '"imagen" es requerida'
  });

const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();

const createProductSchema = Joi.object({
  name: name
    .required(),
  price: price
    .required(),
  image: image
    .required()
});

const updateProductSchema = Joi.object({
  name,
  price,
  image
});

const getProductSchema = Joi.object({
  id: id
    .required()
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema };
