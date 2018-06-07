import uuidv4 from 'uuid/v4';
import uuidv5 from 'uuid/v5';
const now = uuidv4();

import config from 'config';

import { logger } from 'logger';

import { Channel } from './channel';

import { storage } from './storage';

class ChannelControl {
  constructor() {
    let channels = [];
    this.create = chanel => {
      this.channels.push(chanel);
    };
  }
  create(id_owner, namespace) {
    this.create(new Channel(id_owner, namespace));
  }
}

const channelControl = new ChannelControl();

export { channelControl };
