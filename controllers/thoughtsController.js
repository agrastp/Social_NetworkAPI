const { User, Thought } = require('../models');

module.exports = {
    // Get all thoughts
    getThought(req, res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(404).json(err));
    },
    // Get a thought
    getSingleThought(req, res) {
      Thought.findOne({ _id: req.params.thoughtId })
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "No thoughts with this id!" });
          return;
        }
        res.json(thought);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },

    // Create a thought
    postThought({ params, body }, res) {
      Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { username: body.username },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "No thoughts found with this ID" });
          return;
        }
        res.json(thought);
      })
      .catch((err) => res.json(err));
  },
    // Delete a thought
    deleteThought({ params }, res) {
      Thought.findOneAndDelete({ _id: params.thoughtId })
      .then((user) => res.json(user))
      .catch((err) => res.json(err));
  },

    // Update a thought
    updateSingleThought({ params, body }, res) {
      Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true })
        .populate({ path: "reactions", select: "-__v" })
        .select("-__v")
        .then((thought) => {
          if (!thought) {
            res.status(404).json({ message: "No thoughts with this ID!" });
            return;
          }
          res.json(thought);
        })
        .catch((err) => res.json(err));
    },
addReaction({ params, body }, res) {
  Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body }},
      { new: true }
  )
  .populate({ path: "reactions", select: "-__v" })
  .select("-__v")
  .then((thought) => {
    if (!thought) {
      res.status(404).json({ message: "No thoughts with this ID!" });
      return;
    }
    res.json(thought);
  })
  .catch((err) => res.json(err));
},

deleteReaction({ params }, res) {
  Thought.findOneAndUpdate(
    { _id: params.thoughtId },
    { $pull: { reactions: { reactionId: params.reactionId } } },
    { new: true, runValidators: true }
  )
    .then((thought) => {
      if (!thought) {
        res.status(404).json({ message: "No thoughts with this ID!" });
        return;
      }
      res.json(thought);
    })
    .catch((err) => res.json(err));
},
};
