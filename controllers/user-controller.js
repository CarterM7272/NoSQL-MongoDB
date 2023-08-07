const { User, Thought } = require('../models');

const commonSelect = '-__v';

const handleError = (res, err) => {
  console.error(err);
  res.status(400).json(err);
};

const userController = {
  // CRUD operations for users

  // Get all users
  getAllUser(req, res) {
    User.find({})
      .select(commonSelect)
      .sort({ _id: -1 })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => handleError(res, err));
  },

  // Get one User by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({ path: 'thoughts', select: commonSelect })
      .populate({ path: 'friends', select: commonSelect })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => handleError(res, err));
  },

  // Create User
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => handleError(res, err));
  },

  // Update User by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => handleError(res, err));
  },

  // Delete user and associated thoughts
  deleteUser({ params }, res) {
    Thought.deleteMany({ userId: params.id })
      .then(() => User.findOneAndDelete({ userId: params.id }))
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => handleError(res, err));
  },

  // Friend-related methods

  // Add a friend
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true }
    )
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => handleError(res, err));
  },

  // Delete a friend
  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => handleError(res, err));
  }
};

module.exports = userController;