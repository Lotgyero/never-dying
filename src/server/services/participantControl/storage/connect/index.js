/*
  service   :  participantControl
  subsystem :  storage
  action    :  connect
*/

import { logger } from 'logger';
import config from 'config';

const databaseConfig = config.get('participantControl.storage');
const namespaceUUID = config.get('participantControl.uuid').namespace;
import Sequelize from 'sequelize';
const connect = new Sequelize(databaseConfig);

connect
  .authenticate()
  .then(() => {
    logger.log({
      level: 'info',
      label: 'participant storage',
      message: {
        namespaceUUID,
        status: 'successful',
        data: 'connection successful'
      }
    });
  })
  .catch(err => {
    logger.log({
      level: 'error',
      label: 'participant storage',
      message: {
        namespaceUUID,
        status: 'error',
        data: err
      }
    });
  });
export { connect };
