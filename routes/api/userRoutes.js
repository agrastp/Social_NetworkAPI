const router = require('express').Router();

const {
    getUser,
    postUser,
    getSingleUser,
    updateSingleUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController.js');

// get all users and post a new user

router.route('/').get(getUser).post(postUser);

// /api/users/:userId  (gets a single user, updates a user, deletes a user)

router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateSingleUser);
// /api/users/friends (gets a single user's friends)

router.route('/:userId/friends').post(addFriend);

// /api/users/:userId/friends/:friendsId (deletes a single user's friend by id)

router.route('/:userId/friends/:friendsId').delete(deleteFriend);

module.exports = router;