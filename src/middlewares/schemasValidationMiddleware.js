import Joi from "joi";

export const validateUserSchema = (req, res, next) => {
  const user = req.body;
  const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  const { error } = userSchema.validate(user, { abortEarly: false });
  if (error) {
    return res.status(400).send(error.details.map((err) => err.message));
  }
  next();
};

export const validateNewUserSchema = (req, res, next) => {
  const newUser = req.body;
  const newUserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  const { error } = newUserSchema.validate(newUser, { abortEarly: false });
  if (error) {
    return res.status(400).send(error.details.map((err) => err.message));
  }
  next();
};
