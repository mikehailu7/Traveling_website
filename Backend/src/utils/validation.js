//author: mikias hailu and yared tsgie

const { body, validationResult } = require("express-validator");

const userSignupInputRule = () => {
  return [
    body("firstname")
      .not()
      .isEmpty()
      .withMessage("first name is needed")
      .isLength({ min: 2 })
      .withMessage("first name should be more than 2 charachter long"),
    body("lastname")
      .not()
      .isEmpty()
      .withMessage("last name is needed")
      .isLength({ min: 2 })
      .withMessage("last name needs to be more than 2 char "),
    body("email").isEmail(),
    body("phone")
      .not()
      .isEmpty()
      .withMessage("phone number input incorrect")
      .isLength({ min: 10, max: 14 })
      .withMessage("phone number input incorrect"),
    body("password")
      .not()
      .isEmpty()
      .withMessage("password is needed")
      .isLength({ min: 6 })
      .withMessage("password needs 6 char long"),
  ];
};

const userSigninInputRule = () => {
  return [
    body("email").isEmail(),
    body("password")
      .not()
      .isEmpty()
      .withMessage("password is required")
      .isLength({ min: 6 })
      .withMessage("password needs at least 6 char"),
  ];
};

const validateInput = (req, resp, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  const extractedErrors = [];
  errors.array().map((er) => extractedErrors.push({ [er.param]: er.msg }));

  return resp.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  userSignupInputRule,
  userSigninInputRule,
  validateInput,
};
