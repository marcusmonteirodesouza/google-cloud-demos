import express from 'express';
import * as lb from '@google-cloud/logging-bunyan';
import cors from 'cors';
import helmet from 'helmet';
import {db} from './db';
import {HealthCheckRouter} from './health-check';
import {VendorsService, VendorsRouter} from './vendors';
import {errorHandler} from './error-handler';
import {config} from './config';

async function createApp() {
  await db.migrate.latest();

  const vendorsService = new VendorsService({db});

  const healthCheckRouter = new HealthCheckRouter({db}).router;

  const vendorsRouter = new VendorsRouter({vendorsService}).router;

  const app = express();

  const {logger, mw} = await lb.express.middleware({
    level: config.logLevel,
  });

  app.use(mw);

  app.use(helmet());

  app.use(cors());

  app.use(express.json());

  app.use('/', healthCheckRouter);

  app.use('/vendors', vendorsRouter);

  app.use(
    async (
      err: Error,
      req: express.Request,
      res: express.Response,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _next: express.NextFunction
    ) => {
      await errorHandler.handleError(err, req, res);
    }
  );

  return {app, logger};
}

export {createApp};
