import { logger } from 'logger';
import Sequelize from 'sequelize';

import { connect } from '../../connect';
import { add } from './add';
import { del } from './del';
class Channel {
  constructor() {
    const channel = connect.define('Channel', {
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
      deleteByUUID: {
        type: Sequelize.UUID
      }
    });

    this.channel = channel;
  }
  add(item) {
    return add(this.cahnnel, item);
  }
  del(item) {
    return del(this.cahnnel, item);
  }
}

const channel = new Channel();
export { channel };
