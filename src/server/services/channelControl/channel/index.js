/*
  service   :  channelControl
  subsystem :  channel
*/


// import uuidv4 from 'uuid/v4';
// import uuidv5 from 'uuid/v5';
// const now = uuidv4();

import { Result } from 'local-utils';
const r = new Result({
  service:   'channelControl',
  module:    '',
  system:    '',
  subsystem: 'channel',
  action:    ''
});

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
    const data = {
      channelUUID,
      createrUUID,
      ownerUUID,
      nameChannel,
      aboutChannel
    };
    this.channelUUID = channelUUID;
    this.createrUUID = createrUUID;
    this.ownerUUID = ownerUUID;
    this.nameChannel = nameChannel;
    this.aboutChannel = aboutChannel;
    // this.storage = storage.model;

    this.join = participant => {
      let result = this.storage.participant.join(participant);
      console.log('result joun' , result, this.uuid);
      participants.push(participant);
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
  join=(participant)=>{
    this.join(participant);
  }
  remove=(participant)=>{
    this.remove(participant);
  }
  get participants() {
    return this.participants;
  }
}
export { Channel };
