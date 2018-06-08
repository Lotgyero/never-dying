/*
  service   :  channelControl
  subsystem :  storage
  model     :  participant
  module    :  participantScheme
 */

import { logger } from 'logger';
import Sequelize from 'sequelize';
import { connect } from '../../connect';

const participantScheme = connect.define('Participant', {
  participantUUID: {
    type: Sequelize.UUID,
    unique: 'participantUUID',
    allowNull: false
  },
  participantLogin: {
    type: Sequelize.STRING(),
    unique: 'participantLogin',
    allowNull: false
  },
  participantPasswordHash: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  patricipantDateLeave: {
    type: Sequelize.DATE
  }
});
export { participantScheme };
