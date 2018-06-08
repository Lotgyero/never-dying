/*
  service   :  participantControl
  subsustem :  storage
  model     :  model
 */

import { logger } from 'logger';

import { participantScheme } from './scheme';
import { create } from './create';

class Participant {
  constructor() {
    this.participant = participantScheme;
  }
  create(item) {
    return create(item);
  }
}

const participant = new Participant();
export { participant };
