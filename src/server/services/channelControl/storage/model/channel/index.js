/*
  service   :  channelControl
  subsystem :  storage
  model     :  channel
 */

import { logger } from 'logger';

import { channelScheme } from './scheme';

import { create } from './create';
import { remove } from './remove';
class Channel {
  constructor() {
    this.channel = channelScheme;
  }
  create(item) {
    return create(item);
  }
  remove(item) {
    return remove(item);
  }
}

const channel = new Channel();
export { channel };
