const express = require('express');
const router = express.Router();
const { signup, signin, signout } = require('../controllers/auth');

const { userSignupValidator, userSigninValidator } = require('../validators/auth');
const { runValidation } = require('../validators/');

router.post('/signup', userSignupValidator, runValidation, signup);
router.post('/signin', userSigninValidator, runValidation, signin);
router.get('/signout', signout);


module.exports = router;