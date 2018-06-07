/*
  service   :  channelControl
  subsustem :  storage
  model     :  participan
 */

import { logger } from 'logger';
import Sequelize from 'sequelize';

import { connect } from '../../connect';

import { add } from './add';

class Participant {
  constructor() {
    const participant = connect.define('Participant', {
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
      }
    });

    this.participant = participant;
  }
  add(item) {
    return add(this.participant, item);
  }
}

const participant = new Participant();
export { participant };
