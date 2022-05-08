import Joi from "joi";

export const validateUserSchema = (req, res, next) => {
  const user = req.body;
  const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  const validation = userSchema.validate(user, { abortEarly: false });
  if (validation.error) {
    return res
      .status(400)
      .send(validation.error.details.map((error) => error.message));
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
  const validation = newUserSchema.validate(newUser, { abortEarly: false });
  if (validation.error) {
    return res
      .status(400)
      .send(validation.error.details.map((error) => error.message));
  }
  next();
};

export const validateSession = async (req, res, next) => {};
