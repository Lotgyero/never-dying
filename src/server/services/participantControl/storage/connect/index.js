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

import { Result } from 'local-utils';
const r = new Result({
  service:   'channelControl',
  module:    '',
  system:    'storage',
  subsystem: '',
  action:    'connect'
});

let result;
let data = {
  namespaceUUID
};

connect
  .authenticate()
  .then(() => {
    result = r.result({
      data: data,
      error: null
    });
  })
  .catch(error => {
    result = r.result({
      data: null,
      error: error
    });
  });
export { connect };
