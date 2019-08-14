/* eslint-disable import/no-mutable-exports */

import mongoose from 'mongoose';
import mongooseTypeEmail from 'mongoose-type-email'; // necessary for mongoose.SchemaTypes.Email
import { hashSync, compareSync } from 'bcrypt';
import jwt from 'jsonwebtoken';

import constants from '@/config/constants';

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: mongoose.SchemaTypes.Email,
      unique: true,
      required: [true, 'Email is required'],
      trim: true,
    },
    username: {
      type: String,
      trim: true,
      required: [true, 'Name is required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      trim: true,
      minlength: [6, 'Password need to be longer'],
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

// Middleware that Hash user password
// eslint-disable-next-line func-names
UserSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    this.password = this._hashPassword(this.password);
    return next();
  }
  return next();
});

UserSchema.methods = {
  authenticate(password) {
    return compareSync(password, this.password);
  },

  _hashPassword(password) {
    return hashSync(password, 11);
  },

  createToken() {
    return jwt.sign(
      {
        _id: this._id,
      },
      constants.JWT_SECRET
    );
  },

  authJSON() {
    return {
      _id: this._id,
      token: `Bearer ${this.createToken()}`,
    };
  },

  toJSON() {
    return {
      _id: this._id,
      email: this.email,
    };
  },
};

export default mongoose.model('User', UserSchema);
