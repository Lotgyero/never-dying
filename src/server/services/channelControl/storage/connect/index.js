import { logger } from 'logger';
import config from 'config';

const databaseConfig = config.get('storage.channel');

import Sequelize from 'sequelize';
const connect = new Sequelize(databaseConfig);

connect
  .authenticate()
  .then(() => {
    logger.log({
      level: 'info',
      label: 'channel storage',
      message: { status: 'successful', data: 'connection sucsessfull' }
    });
  })
  .catch(err => {
    logger.log({
      level: 'error',
      label: 'channel storage',
      message: { status: 'error', data: err }
    });
  });
export { connect };
