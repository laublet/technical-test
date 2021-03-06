import bodyParser from 'body-parser';
import morgan from 'morgan';
import expressWinston from 'express-winston';
import helmet from 'helmet';
import cors from 'cors';

import winstonInstance from './winston';

const isTest = process.env.NODE_ENV === 'test';
const devEnv = process.env.NODE_ENV === 'development';

export default app => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true, }));
  app.use(helmet());
  app.use(cors());
  if (devEnv && !isTest) {
    app.use(morgan('dev'));
    expressWinston.requestWhitelist.push('body');
    expressWinston.responseWhitelist.push('body');
    app.use(
      expressWinston.logger({
        winstonInstance,
        meta: true,
        msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
        colorStatus: true,
      })
    );
  }
};
