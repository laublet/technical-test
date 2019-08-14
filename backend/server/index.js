/* eslint-disable no-console */
import express from 'express';
import dotEnv from 'dotenv';
import chalk from 'chalk';

import newsLetter from './services/newsletter'

import constants from './config/constants';
import './config/databaseConnection';
import middlewaresConfig from './config/middlewares';
import UserRoutes from './components/users/user.routes';
import ScriptRoutes from './components/script/script.routes';
import CsvRoutes from './components/csv/csv.routes';

dotEnv.config();

const app = express();
app.use(express.static('public'));

middlewaresConfig(app);

app.use('/users', UserRoutes);
app.use('/script', ScriptRoutes);
app.use('/csv', CsvRoutes);

process.on('uncaughtException', err => {
  console.log('\u0007');
  console.error(err, 'Uncaught Exception thrown');
  process.exit(1);
});

app.use((err, req, res, next) => {
  if (err) {
    console.log('\u0007');
    console.error(err, 'Unhandled Exception thrown');
    res.status(500).json({ success: false, message: 'An unexpected error occured..' });
  }
});

const port = constants.PORT || 3000;

if (!module.parent) {
  app.listen(port, err => {
    if (err) {
      console.log(chalk.red('Cannot run!'));
    } else {
      console.log(
        chalk.green.bold(
          `
        App listening on port: ${constants.PORT}
        Env: ${process.env.NODE_ENV}
      `
        )
      );
    }
  });
}
