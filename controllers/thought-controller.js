const { User, Thought } = require('../models');

const commonPopulate = {
  path: 'reactions',
  select: '-__v'
};

const commonSelect = '-__v';

const thoughtController = {
  // CRUD operations for thoughts
  getAllThought(req, res) {
    Thought.find({})
      .populate(commonPopulate)
      .select(commonSelect)
      .sort({ _id: -1 })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => handleError(res, err));
  },

  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate(commonPopulate)
      .select(commonSelect)
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thoughts found with that id!' });
        }
        res.json(dbThoughtData);
      })
      .catch(err => handleError(res, err));
  },

  createThought({ body }, res) {
    Thought.create(body)
      .then(({ _id }) => User.findOneAndUpdate({ _id: body.userId }, { $push: { thoughts: _id } }, { new: true }))
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json(dbThoughtData);
      })
      .catch(err => handleError(res, err));
  },

  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thoughts found with that id!' });
        }
        res.json(dbThoughtData);
      })
      .catch(err => handleError(res, err));
  },

  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thoughts found with that id!' });
        }
        return User.findOneAndUpdate({ _id: params.userId }, { $pull: { thoughts: params.id } }, { new: true });
      })
      .then(dbUserData => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No User found with this id!' });
        }
        res.json(dbUserData);
      })
      .catch(err => handleError(res, err));
  },

  // CRUD operations for reactions
  createReaction({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, { $push: { reactions: body } }, { new: true, runValidators: true })
      .populate(commonPopulate)
      .select(commonSelect)
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thoughts with this ID.' });
        }
        res.json(dbThoughtData);
      })
      .catch(err => handleError(res, err));
  },

  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'Nope!' });
        }
        res.json(dbThoughtData);
      })
      .catch(err => handleError(res, err));
  }
};

function handleError(res, err) {
  console.error(err);
  res.status(400).json(err);
}

module.exports = thoughtController;