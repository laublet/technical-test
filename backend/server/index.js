/* eslint-disable no-console */
import chalk from 'chalk';

import app from './app'
import constants from './config/constants';

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
