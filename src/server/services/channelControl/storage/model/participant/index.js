/*
  service   :  channelControl
  subsustem :  storage
  model     :  participan
 */

import { logger } from 'logger';

import { participantScheme } from './scheme';
import { add } from './add';
import { del } from './del';

class Participant {
  constructor() {
    this.participant = participantScheme;
  }
  add(item) {
    return add(item);
  }
  del(item) {
    return del(item);
  }
  search() {}
}

const participant = new Participant();
export { participant };
