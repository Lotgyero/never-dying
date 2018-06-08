/*
  service   :  participantControl
  subsystem :  storage
  model     :  model
 */

import { logger } from 'logger';

import { participant } from './participant';

class Model {
  get participant() {
    return participant;
  }
}

const model = new Model();
export { model };
