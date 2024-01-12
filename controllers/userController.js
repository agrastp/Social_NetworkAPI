const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  getUser(req, res) {
    User.find()
      .populate({ path: "thoughts", select: "-__v" })
      .populate({ path: "friends", select: "-__v" })
      .select("-__v")
      .then((users) => res.json(users))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate({ path: "thoughts", select: "-__v" })
      .populate({ path: "friends", select: "-__v" })
      .select("-__v")
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: 'No user with this id' });
          return;
        }
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // create a new user
  postUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a user and remove them from the course
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.userId })
      .then((user) => res.json(user))
      .catch((err) => res.json(err));
  },
  //Update a single user
  updateSingleUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: 'No user with this id' });
          return;
        }
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //add a friend to a user
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .populate({ path: "friends", select: "-__v" })
      .select("-__v")
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user found with this ID" });
          return;
        }
        console.log("Friend added successfully");
        res.json(user);
      })
      .catch((err) => {
        console.error("Error adding friend:", err);
        res.status(500).json(err);
      });
  },
  //delete a friend from a user
  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .populate({ path: "friends", select: "-__v" })
      .select("-__v")
      .then((user) => res.json(user))
      .catch((err) => res.json(err));
  },
};

