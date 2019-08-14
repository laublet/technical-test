import { Router } from 'express';
import validate from 'express-validation';

import { authLocal, authJwt } from '@/services/auth';
import upload from '@/config/uploadConf';

import * as UserController from './user.controller';
import UpdateUserObject from './user.middlewares';
import validator from './user.validator';

// Launch newsLetter logic
// import email from './user.email';

const user = new Router();

/**
 * @api {post} /users/signup
 * @apiDescription Create a user
 * @apiName createUser
 * @apiGroup Users
 * @apiPermission anonymous
 *
 * @apiParam (Body) {String} email User email.
 * @apiParam (Body) {String} password User password.
 *
 * @apiSuccess {String} _id User id.
 * @apiSuccess {String} token Authentication token.
 *
 * @apiSuccessExample Success-Response:
 *
 * HTTP/1.1 200 OK
 *
 * {
 *  _id: '123',
 *  token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUzYzk4ZjY4YWNlNzZkOGU1NjAxODQiLCJpYXQiOjE1NjU3NzIxOTN9.tPuQdHJmBvS9E1RoVisIPoj6Acgij-6PvT8i8WL6anU',
 * }
 *
 * @apiErrorExample {json} Error
 *  HTTP/1.1 400 Bad Request
 *
 * {
 *  "message": "validation error",
 *  "errors": {
 *      "email": "email is required"
 *   }
 * }
 */
user.post('/signup', validate(validator.create), UserController.createUser);

/**
 * @api {post} /users/login
 * @apiDescription Login a user
 * @apiName loginUser
 * @apiGroup Users
 *
 * @apiParam (Body) {String} email User email.
 * @apiParam (Body) {String} password User password.
 *
 * @apiSuccess {Number} status Status of the Request.
 * @apiSuccess {Object} User Object user
 * @apiSuccess {String} token Authentication token.
 *
 * @apiSuccessExample Success-Response:
 *
 * HTTP/1.1 200 OK
 *
 * {
 *  _id: '123',
 *  token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUzYzk4ZjY4YWNlNzZkOGU1NjAxODQiLCJpYXQiOjE1NjU3NzIxOTN9.tPuQdHJmBvS9E1RoVisIPoj6Acgij-6PvT8i8WL6anU',
 * }
 *
 * @apiErrorExample {json} Error
 *  HTTP/1.1 400 Bad Request
 *
 *  {
 *    email: 'email is required'
 *  }
 */
user.post('/login', validate(validator.login), authLocal, UserController.loginUser);

/**
 * @api {get} /users
 * @apiDescription Get user info
 * @apiName getUser
 * @apiGroup Users
 *
 * @apiHeader {Authorization} Authorization Bearer Token
 * @apiSuccess {Object} User Object user
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "AUTHORIZATION": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUzYzk4ZjY4YWNlNzZkOGU1NjAxODQiLCJpYXQiOjE1NjU3NzIxOTN9.tPuQdHJmBvS9E1RoVisIPoj6Acgij-6PvT8i8WL6anU"
 * }
 *
 * @apiSuccessExample Success-Response:
 *
 * HTTP/1.1 200 OK
 *
 * {
 *  email: 'test@test.com',
 *  username: 'test',
 *  avatar: 'default_avatar.jpeg',
 * }
 *
 * @apiErrorExample {json} Error
 *  HTTP/1.1 401 Forbidden
 *
 * {
 *   "status": 401,
 *   "success": false,
 *   "message": "You are not authorized to access this resource"
 * }
 */
user.get('/', authJwt, UserController.getUser);

/**
 * @api {put} /users
 * @apiDescription update user info
 * @apiName updateUser
 * @apiGroup Users
 *
 * @apiHeader {Authorization} Authorization Bearer Token
 * @apiSuccess {Object} Updated Object user
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "AUTHORIZATION": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUzYzk4ZjY4YWNlNzZkOGU1NjAxODQiLCJpYXQiOjE1NjU3NzIxOTN9.tPuQdHJmBvS9E1RoVisIPoj6Acgij-6PvT8i8WL6anU"
 * }
 *
 * @apiSuccessExample Success-Response:
 *
 * HTTP/1.1 200 OK
 *
 * {
 *  email: 'test@test.com',
 *  username: 'test',
 *  avatar: 'default_avatar.jpeg',
 * }
 *
 * @apiErrorExample {json} Error
 *  HTTP/1.1 401 Forbidden
 *
 * {
 *   "status": 401,
 *   "success": false,
 *   "message": "You are not authorized to access this resource"
 * }
 */
user.put(
  '/',
  validate(validator.update),
  authJwt,
  upload.single('avatar'),
  UpdateUserObject,
  UserController.updateUser
);

/**
 * @api {delete} /users/deleteUser
 * @apiDescription delete user info
 * @apiName deleteUser
 * @apiGroup Users
 *
 * @apiHeader {Authorization} Authorization Bearer Token
 * @apiSuccess {string} User deleted confirmation message
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "AUTHORIZATION": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDUzYzk4ZjY4YWNlNzZkOGU1NjAxODQiLCJpYXQiOjE1NjU3NzIxOTN9.tPuQdHJmBvS9E1RoVisIPoj6Acgij-6PvT8i8WL6anU"
 * }
 *
 * @apiSuccessExample Success-Response:
 *
 * HTTP/1.1 200 OK
 *
 * 'user deleted successfully'
 *
 * @apiErrorExample {json} Error
 *  HTTP/1.1 401 Forbidden
 *
 * {
 *   "status": 401,
 *   "success": false,
 *   "message": "You are not authorized to access this resource"
 * }
 */
user.delete('/deleteUser', authLocal, authJwt, UserController.deleteUser);

export default user;
