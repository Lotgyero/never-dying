/*
  service   :  channelControl
  subsustem :  storage
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
  nameChannel: {
    type: Sequelize.TEXT
  },
  aboutChannel: {
    type: Sequelize.TEXT
  },
  deleterUUID: {
    type: Sequelize.UUID
  },
  dateDestroy: {
    type: Sequelize.DATE
  }
});
export { channelScheme };
