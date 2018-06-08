import { logger } from 'logger';
import config from 'config';

const databaseConfig = config.get('storage.participant');

import Sequelize from 'sequelize';
const connect = new Sequelize(databaseConfig);

connect
  .authenticate()
  .then(() => {
    logger.log({
      level: 'info',
      label: 'participant storage',
      message: { status: 'successful', data: 'connection successful' }
    });
  })
  .catch(err => {
    logger.log({
      level: 'error',
      label: 'participant storage',
      message: { status: 'error', data: err }
    });
  });
export { connect };
