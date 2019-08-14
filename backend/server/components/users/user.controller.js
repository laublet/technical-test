/* eslint-disable no-use-before-define */
import catchError from '@/services/error';

import User from './user.model';

module.exports = {
  createUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
};

function createUser(req, res, next) {
  const newUser = req.body;

  newUser.avatar = '';

  User.create(newUser)
    .then(user => {
      const userToken = user.authJSON();

      return res.status(201).json(userToken);
    })
    .catch(err => {
      next(catchError(err));
    });
}

function loginUser(req, res, next) {
  return res.status(200).json(req.user.authJSON());
}

function getUser(req, res, next) {
  const id = req.params.id || req.user._id;

  User.findById(id)
    .then(user => {
      if (!user) {
        return res.status(404).json('user not found');
      }

      const userToSend = {
        email: user.email,
        username: user.username,
        avatar: user.avatar,
      };

      return res.status(200).json(userToSend);
    })
    .catch(err => {
      next(catchError(err));
    });
}

function updateUser(req, res, next) {
  if (!res.locals.userUpdate) {
    return res.status(500).json('Something went wrong');
  }

  const id = req.params.id || req.user._id;
  const updateOps = res.locals.userUpdate;

  return User.findOneAndUpdate({ _id: id }, { $set: updateOps }, { new: true })
    .then(userUpdated => {
      if (!userUpdated) {
        return res.status(404).json('User not found');
      }
      const userToRetrun = { ...userUpdated._doc };
      return res.status(201).json(userToRetrun);
    })
    .catch(err => {
      next(catchError(err));
    });
}

function deleteUser(req, res, next) {
  const id = req.params.id || req.user._id;

  User.findOneAndRemove({ _id: id })
    .then(() => {
      return res.status(200).json('User deleted successfully');
    })
    .catch(err => {
      next(catchError(err));
    });
}
