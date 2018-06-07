import uuidv4 from 'uuid/v4';
import uuidv5 from 'uuid/v5';
const now = uuidv4();

import config from 'config';

import { logger } from '../../../logger';
import { Protocol } from '../../../../protocol';

class Connection {
  constructor(ws, disconnecting, namespace = now) {
    this.id = uuidv5(uuidv4(), namespace);
    this.ws = ws;
    this.disconnecting = disconnecting;
    this.protocol = new Protocol(logger);

    ws.onping = () => {};

    ws.onpong = () => {};

    const neardBit = () => {
      ws.ping('ping');
    };

    const tick = setInterval(neardBit, config.get('server').heardbit);

    ws.on('close', reason => {
      clearInterval(tick);
      logger.log({
        level: 'info',
        label: 'Server connection close',
        message: { id: this.id, 'connection close': reason }
      });

      this.disconnecting(this);
    });
    ws.on('error', error => {
      logger.log({
        level: 'error',
        label: 'Server connection',
        message: { id: this.id, error: error }
      });
    });

    const onMessage = (ws, message) => {
      const { error, msg } = this.protocol.deSerialize(message);

      if (error) {
        logger.log({
          level: 'error',
          label: 'message',
          message: { id: this.id, error: 'parser error' }
        });
        //        ws.close(4999); // when error
      } else {
        try {
          ws.send(this.protocol.serialize(msg));
        } catch (error) {
          logger.log({
            level: 'error',
            label: 'message send',
            message: { id: this.id, error: error }
          });
        }
        logger.log({
          level: 'info',
          label: 'message send',
          message: { id: this.id, msg: msg }
        });
      }
    };

    this.ws.on('message', message => {
      onMessage(this.ws, message);
    });
  }
  open() {}
}

export { Connection };
