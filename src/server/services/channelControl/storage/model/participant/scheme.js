/*
  service   :  channelControl
  subsystem :  storage
  model     :  participant
  module    :  participantScheme
 */

import { logger } from 'logger';
import Sequelize from 'sequelize';
import { connect } from '../../connect';

import { Result } from 'local-utils';
const r = new Result({
  service:   'channelControl',
  module:    '',
  system:    'storage',
  subsystem: 'participan',
  action:    ''
});


const participantScheme = connect.define('Participant', {
  uuid: {
    type: Sequelize.UUID,
    unique: 'uuid',
    defaultValue: Sequelize.UUIDV4,
    allowNull: false
  },
  channelUUID: {
    type: Sequelize.UUID,
    allowNull: false
  },
  participantUUID: {
    type: Sequelize.UUID,
    allowNull: false
  },
  patricipantDateLeave: {
    type: Sequelize.DATE
  }
});
export { participantScheme };
