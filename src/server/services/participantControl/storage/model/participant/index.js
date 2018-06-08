/*
  service   :  participantControl
  subsustem :  storage
  model     :  model
 */

import { logger } from 'logger';

import { participantScheme } from './scheme';
import { add } from './add';

class Participant {
  constructor() {
    this.participant = participantScheme;
  }
  add(item) {
    return add(item);
  }
}

const participant = new Participant();
export { participant };
