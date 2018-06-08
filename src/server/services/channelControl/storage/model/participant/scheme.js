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
  participanUUID: {
    type: Sequelize.UUID,
    allowNull: false
  },
  dateLeave: {
    // not full define causes
    type: Sequelize.DATE
  }
});
export { participantScheme };
