import uuidv4 from 'uuid/v4';
import uuidv5 from 'uuid/v5';
const now = uuidv4();

import { logger } from '../../../logger';

class Channel {
  constructor(id_owner, namespace = now) {
    let participants = [];
    this.namespace = namespace;
    this.id = uuidv5(id_owner, namespace);

    this.add = participant => {
      this.participants.push(participant);
      logger.log({
        level: 'info',
        label: 'channel add participant',
        message: { id: this.id, participant: participant }
      });
    };

    this.del = participant => {
      const newParticipant = this.participants.filter(part => {
        return part !== participant;
      });
      participants = newParticipant;
      logger.log({
        level: 'info',
        label: 'channel delete participant',
        message: { id: this.id, removeParticipant: participant }
      });
    };
    this.participants = () => {
      logger.log({
        level: 'info',
        label: 'channel participans list',
        message: { id: this.id, participants: participants }
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
