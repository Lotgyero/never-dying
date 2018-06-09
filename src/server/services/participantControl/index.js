/*
  service   :  participantControl
*/

import uuidv4 from 'uuid/v4';
import uuidv5 from 'uuid/v5';
const now = uuidv4();

import { create } from './create';

class ParticipantControl {
  constructor(namespace = now) {
    this.participantControlID = uuidv5(uuidv4(), namespace);
    let activeParticipants = [];
  }
}

const participantControl = new ParticipantControl();

export { participantControl };
