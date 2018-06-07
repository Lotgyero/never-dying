import { logger } from 'logger';
import Sequelize from 'sequelize';

import { connect } from '../../connect';

class Channel {
  constructor() {
    const channel = connect.define('Channel', {
      uuid: {
        type: Sequelize.UUID,
        unique: 'uuid',
        allowNull: false
      },
      creater: {
        type: Sequelize.UUID,
        allowNull: false
      },
      name: {
        type: Sequelize.TEXT
      },
      about: {
        type: Sequelize.TEXT
      },
      deleteBy: {
        type: Sequelize.UUID
      }
    });
  }
}

const channel = new Channel();
export { channel };
