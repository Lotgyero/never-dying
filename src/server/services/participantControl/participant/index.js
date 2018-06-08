/*
  service   :  participantControl
  subsystem :  patricipant
*/

import { logger } from 'logger';

import uuidv4 from 'uuid/v4';
import uuidv5 from 'uuid/v5';
const now = uuidv4();

import { storage } from '../storage';

class Participant {
  constructor(namespace = now) {
    this.id = uuidv5(uuidv4, namespace);
  }
  add(login, password) {}
  del(participanUUID) {}
}

export { Participant };
