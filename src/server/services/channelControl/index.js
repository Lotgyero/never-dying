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
  }
  create(ownerUUID, namespace) {
    return create(ownerUUID, namespace);
  }
  remove(channelUUID) {}
}

const channelControl = new ChannelControl();

export { channelControl };
