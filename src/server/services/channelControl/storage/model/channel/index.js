/*
  service   :  channelControl
  subsustem :  storage
  model     :  channel
 */

import { logger } from 'logger';

import { channelScheme } from './scheme';

import { add } from './add';
import { del } from './del';
class Channel {
  constructor() {
    this.channel = channelScheme;
  }
  add(item) {
    return add(item);
  }
  del(item) {
    return del(item);
  }
}

const channel = new Channel();
export { channel };
