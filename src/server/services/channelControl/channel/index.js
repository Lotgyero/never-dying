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
      const {participantUUID}  = participant;
      let result = this.storage.participant.join({channelUUID, participantUUID});
      console.log('result joun' , result, this.channelUUID);
      participants.push(participant);
    };

    this.leave = participant => {
      const {participantUUID}  = participant;
      let result = this.storage.participant.leave({channelUUID, participantUUID});

      const newParticipants = participants.filter(part => {
        return part !== participant;
      });

      participants = newParticipants;

    };
    this.participants = () => {
      let result = this.storage.participant.list({channelUUID});
      return result;
    };
  }
  join=(participant)=>{
    this.join(participant);
  }
  leave=(participant)=>{
    this.leave(participant);
  }
  get participants() {
    return this.participants();
  }
}
export { Channel };
