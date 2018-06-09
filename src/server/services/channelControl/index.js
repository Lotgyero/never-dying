/*
  service   :  channelControl
*/

// import { Channel } from './channel';

import { create } from './create';

class ChannelControl {
  constructor() {
    let channels = [];
    // this.create = (ownerUUID, namespace) => {
    //   const newChannel = new Channel(ownerUUID, namespace);
    //   channels.push(newChannel);
    //   return newChannel;
    // };
    this.remove = cannelID => {};
    this.channelCreate = channel => {
      channels.push(channel);
    };
  }
  create(channelUUID, createrUUID, ownerUUID) {
    const channelCreated = create(channelUUID, createrUUID, ownerUUID);
    if (!channelCreated.error) {
      this.createChannel(channelCreated.data);
    }
    return;
  }
  remove(channelUUID) {}
}

const channelControl = new ChannelControl();

export { channelControl };
