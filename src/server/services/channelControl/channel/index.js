/*
  service   :  channelControl
  subsustem :  channel
*/

import { logger } from 'logger';

import uuidv4 from 'uuid/v4';
import uuidv5 from 'uuid/v5';
const now = uuidv4();

import { storage } from '../storage';

class Channel {
  constructor(id_owner, namespace = now) {
    let participants = [];
    this.namespace = namespace;
    this.channelUUID = uuidv5(id_owner, namespace);
    this.storage = storage.model;
    this.add = participant => {
      logger.log({
        level: 'info',
        label: 'channel add participant',
        message: this.storage.participant.add(participant)
      });
      // FiX condition processing
      participants.push(participant);
      logger.log({
        level: 'info',
        label: 'channel add participant',
        message: { uuid: this.uuid, participant: participant }
      });
    };

    this.del = participant => {
      const newParticipant = participants.filter(part => {
        return part !== participant;
      });
      participants = newParticipant;
      logger.log({
        level: 'info',
        label: 'channel delete participant',
        message: { uuid: this.uuid, removeParticipant: participant }
      });
    };
    this.participants = () => {
      logger.log({
        level: 'info',
        label: 'channel participans list',
        message: { uuid: this.uuid, participants: participants }
      });
      return participants;
    };
  }
  add(participant) {
    this.add(participant);
  }
  del(participant) {
    this.del(participant);
  }
  get participants() {
    return this.participants;
  }
}
export { Channel };
