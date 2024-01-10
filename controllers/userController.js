const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  getUser(req, res) {
   User.find()
   .then((users) => res.json(users))
   .catch((err) => res.status(500).json(err));
},
  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' })
      }
      res.json({
        user,
        thoughts,
        friends
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new user
  async postUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a student and remove them from the course
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No such user exists' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};
