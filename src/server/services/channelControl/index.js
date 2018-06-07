/*
  service   :  channelControl
 */
import config from 'config';
import { logger } from 'logger';

import { Channel } from './channel';

class ChannelControl {
  constructor() {
    let channels = [];
    this.create = (ownerUUID, namespace) => {
      const newChannel = new Channel(ownerUUID, namespace);
      channels.push(newChannel);
      return newChannel;
    };
    this.remove = cannelID => {};
  }
  create(ownerUUID, namespace) {
    return this.create(ownerUUID, namespace);
  }
  remove(channelUUID) {}
}

const channelControl = new ChannelControl();

export { channelControl };
