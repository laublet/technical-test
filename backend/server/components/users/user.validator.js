import Joi from 'joi';

const validator = {
  create: {
    body: {
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .min(6)
        .required(),
      username: Joi.string().required(),
    },
  },
  login: {
    body: {
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
    },
  },
  update: {
    body: {
      userUpdate: {
        email: Joi.string().email(),
        password: Joi.string().min(10),
        username: Joi.string().required(),
      },
    },
  },
};

export default validator;
