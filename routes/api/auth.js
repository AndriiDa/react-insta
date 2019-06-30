const express = require('express');
const router = express.Router();
const {signUp, signIn, signOut} = require("../../controllers/auth")
const {userById} = require("../../controllers/users")

// @route   GET api/posts/
// @desc    Tests post route
// @access  Public
router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/signout', signOut);

router.param("userId", userById)

module.exports = router;


