/*
  service   :  channelControl
  subsustem :  storage
  model     :  participan
  module    :  participantScheme
 */

import { logger } from 'logger';
import Sequelize from 'sequelize';
import { connect } from '../../connect';

const participantScheme = connect.define('Participant', {
  participanUUID: {
    type: Sequelize.UUID,
    unique: 'participanUUID',
    allowNull: false
  },
  participanLogin: {
    type: Sequelize.STRING(),
    unique: 'participanLogin',
    allowNull: false
  },
  participanPasswordHash: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  dateLeave: {
    // not full define causes
    type: Sequelize.DATE
  }
});
export { participantScheme };
