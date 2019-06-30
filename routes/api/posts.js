const express = require('express');
const router = express.Router();
const { getPosts, createPost } = require("../../controllers/posts")
const { requireSignIn } = require("../../controllers/auth")
const {userById} = require("../../controllers/users")

// @route   GET api/posts/
// @desc    Tests post route
// @access  Public
router.get('/',  getPosts);
router.post('/', requireSignIn, createPost);

router.param("userId", userById)

module.exports = router;