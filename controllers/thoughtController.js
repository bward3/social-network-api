const { Thought, User } = require("../models");

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  getSingleThought(req, res) {
    Thought.findOne({
      _id: req.params.thoughtId,
    })
      .select("-__v")
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },

  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        console.log(thought.userName);
        User.findOneAndUpdate(
          { userName: thought.userName },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        ).then((user) => {
          !user
            ? res.status(404).json({ message: "No user with that username." })
            : res.json(user);
        });
      })
      .catch((err) => res.status(500).json(err));
  },

  deleteThought(req, res) {
    Thought.findOneAndDelete({
      _id: req.params.thoughtId,
    })
      .then((thought) => {
        User.update(
          { userName: thought.userName },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        );
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },

  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that id" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { new: true }
    )
      .then((thought) => {
        !thought
          ? res.status(404).json({ message: "No thought with that id" })
          : res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },

  getReactions(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("reactions")
      .then((reactions) =>
        !reactions
          ? res.status(404).json({ message: "No thought with that id" })
          : res.json(reactions)
      )
      .catch((err) => res.status(500).json(err));
  },

  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that id" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
