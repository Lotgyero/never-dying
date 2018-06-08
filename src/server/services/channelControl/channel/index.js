/*
  service   :  channelControl
  subsystem :  channel
*/

import { logger } from 'logger';

// import uuidv4 from 'uuid/v4';
// import uuidv5 from 'uuid/v5';
// const now = uuidv4();

import { storage } from '../storage';

class Channel {
  constructor(item) {
    let participants = [];
    const {
      channelUUID,
      createrUUID,
      ownerUUID,
      nameChannel,
      aboutChannel
    } = item;
    this.channelUUID = channelUUID;
    this.createrUUID = createrUUID;
    this.ownerUUID = ownerUUID;
    this.nameChannel = nameChannel;
    this.aboutChannel = aboutChannel;

    // this.storage = storage.model;
    this.join = participant => {
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

    this.leave = participant => {
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
        label: 'channel participants list',
        message: { uuid: this.uuid, participants: participants }
      });
      return participants;
    };
  }
  add(participant) {
    this.add(participant);
  }
  remove(participant) {
    this.remove(participant);
  }
  get participants() {
    return this.participants;
  }
}
export { Channel };
