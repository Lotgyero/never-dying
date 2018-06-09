/*
  service   :  channelControl
*/

import uuidv5 from 'uuid/v5';

import config from 'config';

import { create } from './create';

class ChannelControl {
  constructor() {
    let channels = [];
    const namespaceUUID = config.get('channelControl.uuid').namespace;
    this.namespaceUUID = namespaceUUID;

    this.remove = channelID => {};

    this.channelCreate = item => {
      let result;
      const channel = create(item);
      if (channel && channel.data && !channel.error) {
        channels.push(channel.data);
      }
    };
  }
  create(createrUUID, ownerUUID) {
    const channelCreated = create(
      uuidv5(uuidv5, this.namespaceUUID),
      createrUUID,
      ownerUUID
    );
    if (!channelCreated.error) {
      this.createChannel(channelCreated.data);
    }
    return;
  }
  remove(channelUUID) {}
}

const channelControl = new ChannelControl();

export { channelControl };
