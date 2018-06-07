import { logger } from 'logger';
import Sequelize from 'sequelize';

import { connect } from '../../connect';

class Participant {
  constructor() {
    const participant = connect.define('Participant', {
      uuid: {
        type: Sequelize.UUID,
        unique: 'uuid',
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
      },
      uuidChannel: {
        type: Sequelize.UUID,
        allowNull: false
      },
      uuidParticipan: {
        type: Sequelize.UUID,
        allowNull: false
      }
    });
  }
}
