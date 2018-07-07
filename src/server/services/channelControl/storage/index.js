/*
  service   :  channelControl
  subsystem :  storage
 */

import { logger } from 'logger';
import { connect } from './connect';
import { model } from './model';

import { Result } from 'local-utils';
const r = new Result({
  service:   'channelControl',
  module:    '',
  system:    '',
  subsystem: 'storage',
  action:    ''
});


connect.sync();
class Storage {
  get model() {
    return model;
  }
  close=()=>{
    connect.close();
  }
  sync=()=>{
    connect.sync();
  }
}

const storage = new Storage();

export { storage };
