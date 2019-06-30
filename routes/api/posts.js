const express = require('express');
const router = express.Router();
const { getPosts, createPost, postsByUser } = require("../../controllers/posts")
const { requireSignIn } = require("../../controllers/auth")
const { userById } = require("../../controllers/users")

// @route   GET api/posts/
// @desc    Tests post route
// @access  Public
router.get('/',  getPosts);
router.post('/:userId', requireSignIn, createPost);
router.get('/by/:userId', requireSignIn, postsByUser);

router.param("userId", userById)

module.exports = router;