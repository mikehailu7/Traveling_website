const express = require('express');
const { userSigninInputRule, userSignupInputRule, validateInput } = require('../utils/validation');
const { login, register } = require('../controllers/auth/authenticatecont');


const authRouter = express.Router();

authRouter.post('/register', userSignupInputRule(), validateInput, register)
authRouter.post('/login', userSigninInputRule(), validateInput, login);


module.exports = authRouter;