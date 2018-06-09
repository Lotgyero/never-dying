/*
  service   :  participantControl
*/

import config from 'config';
import crypto from 'crypto';

import { logger } from 'logger';

import { create } from './create';

class ParticipantControl {
  constructor() {
    let activeParticipants = [];
    const namespaceUUID = config.get('participantControl.uuid').namespace;
    this.namespaceUUID = namespaceUUID;

    this.create = async item => {
      const { participantLogin, participantPassword } = item;
      const key = crypto.pbkdf2Sync(
        participantPassword,
        'salt',
        100000,
        64,
        'sha512'
      );
      const participantPasswordHash = key.toString();
      logger.info(participantPasswordHash);
      return await create({
        participantLogin,
        participantPasswordHash,
        namespaceUUID
      });
    };
  }
  create(item) {
    this.create(item);
  }
}

const participantControl = new ParticipantControl();

export { participantControl };
