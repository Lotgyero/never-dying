/*
  service   :  channelControl
  subsystem :  storage
  model     :  model
 */


import { Result } from 'local-utils';
const r = new Result({
  service:   'channelControl',
  module:    '',
  system:    '',
  subsystem: 'storage',
  action:    ''
});

import { channel } from './channel';
import { participant } from './participant';

class Model {
  get cannel() {
    return channel;
  }
  get participant() {
    return participant;
  }
}
const model = new Model();
export { model };
