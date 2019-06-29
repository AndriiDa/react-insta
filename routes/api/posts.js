const express = require('express');
const router = express.Router();
const {getPosts, createPost} = require("../../controllers/posts")

// @route   GET api/posts/
// @desc    Tests post route
// @access  Public
router.get('/', getPosts);
router.post('/', createPost);

module.exports = router;