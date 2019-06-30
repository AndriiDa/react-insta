const express = require('express')
const router = express.Router()
const { userById, 
        getAllUsers, 
        getUser,
        userUpdate,
        userDelete 
      } = require("../../controllers/users")
const { requireSignIn } = require("../../controllers/auth")

// @route   GET api/users/
// @desc    Tests post route
// @access  Private
router.get('/', getAllUsers);
router.get('/:userId', requireSignIn,  getUser);
router.put('/:userId', requireSignIn,  userUpdate);
router.delete('/:userId', requireSignIn,  userDelete);

router.param("userId", userById)

module.exports = router;


