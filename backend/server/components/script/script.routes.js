import { Router } from 'express';

import { authJwt } from '@/services/auth';

import launchScript from './script.controller';

const script = new Router();

/**
 * @api {get} /script
 * @apiDescription Get the output of the script 
 * @apiName getScript
 * @apiGroup Script
 *
 * @apiHeader {Authorization} Authorization Bearer Token
 * @apiSuccess {string} Output of the Script 
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
 * '%Iarxhv#WXo^McND\n'
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
script.get('/', authJwt, launchScript);

export default script;
