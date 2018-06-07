import { logger } from 'logger';

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
