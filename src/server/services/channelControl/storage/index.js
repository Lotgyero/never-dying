/*
  service   :  channelControl
  subsystem :  storage
 */

import { logger } from 'logger';
import { connect } from './connect';
import { model } from './model';

connect.sync();

class Storage {
  get model() {
    return model;
  }
  close() {
    connect.close();
  }
  sync() {
    connect.sync();
  }
}

const storage = new Storage();

export { storage };
