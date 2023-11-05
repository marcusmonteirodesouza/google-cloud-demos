import {createApp} from './app';
import {config} from './config';

createApp().then(({app, logger}) => {
  app.listen(config.port, () => {
    logger.info(
      `Google Cloud Demos - Invoice Management System - Default Service server listening on port ${config.port}...`
    );
  });
});