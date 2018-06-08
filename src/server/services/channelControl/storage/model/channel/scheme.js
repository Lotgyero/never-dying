/*
  service   :  channelControl
  subsystem :  storage
  model     :  channel
  module    :  channelScheme
 */

import Sequelize from 'sequelize';
import { connect } from '../../connect';

const channelScheme = connect.define('Channel', {
  channelUUID: {
    type: Sequelize.UUID,
    unique: 'channelUUID',
    allowNull: false
  },
  createrUUID: {
    type: Sequelize.UUID,
    allowNull: false
  },
  ownerUUID: {
    type: Sequelize.UUID,
    allowNull: false
  },
  channelName: {
    type: Sequelize.TEXT
  },
  channelAbout: {
    type: Sequelize.TEXT
  },
  deleterUUID: {
    type: Sequelize.UUID
  },
  deleteDate: {
    type: Sequelize.DATE
  }
});
export { channelScheme };
