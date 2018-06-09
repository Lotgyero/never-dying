/*
  service   :  participantControl
  subsystem :  storage
  model     :  model
 */

import { logger } from 'logger';

import { participantScheme } from './scheme';
import { create } from './create';
// import { remove } from './remove';
import { authorization } from './authorization';

class Participant {
  constructor() {
    this.participant = participantScheme;
  }
  create(item) {
    return create(item);
  }
  authorization(item) {
    return authorization(item);
  }
}

const participant = new Participant();
export { participant };
