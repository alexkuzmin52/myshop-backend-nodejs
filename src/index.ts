import * as http from 'http';

import {app} from './app';
import {config} from './config';
// import {CronJobsRunDeleteOldCart} from './cron-jobs';
// import {CronJobsRunDeleteOldOrder} from './cron-jobs';
// import {cronJobRun} from ''

const server = http.createServer(app);

server.listen(config.PORT, () => {
  console.log(`listen on port ${config.PORT}`);
});
//TODO
// CronJobsRunDeleteOldCart();
// CronJobsRunDeleteOldOrder();

process.on('SIGTERM', () => {
  server.close(() => {
    process.exit(0);
  });
});

process.on('uncaughtException', error => {
  console.log(error);
});

process.on('unhandledRejection', error => {
  console.log(error);
});
