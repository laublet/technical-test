import { Router } from 'express';

import { authJwt } from '@/services/auth';

import launchCSV from './csv.controller';

const csv = new Router();

/**
 * @api {get} /csv
 * @apiDescription Get the content of the csv 
 * @apiName getCSV
 * @apiGroup CSV
 *
 * @apiHeader {Authorization} Authorization Bearer Token
 * @apiSuccess {Object} Array of Object 
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
 *  users: [
 *    {
        "id": "1",
        "first_name": "Griselda",
        "last_name": "Tures",
        "email": "gtures0@home.pl",
        "gender": "Female",
        "ip_address": "63.139.159.33"
      },
      ...
 *  ]
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
csv.get('/', authJwt, launchCSV);

export default csv;
