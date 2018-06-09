/*
  service   :  connectionControl
  subsystem :  connection
*/

import uuidv4 from 'uuid/v4';
import uuidv5 from 'uuid/v5';

import config from 'config';

import { logger } from 'logger';
import { Protocol } from '../../../../protocol';

class Connection {
  constructor(namespaceUUID, ws, disconnecting) {
    this.namespaceUUID = namespaceUUID;
    this.connectionUUID = uuidv5(uuidv4(), namespaceUUID);
    this.ws = ws;
    this.disconnecting = disconnecting;
    this.protocol = new Protocol(logger);

    ws.onping = () => {};

    ws.onpong = () => {};

    const neardBit = () => {
      ws.ping('ping');
    };

    const tick = setInterval(
      neardBit,
      config.get('connectionControl.connection').heardbit
    );

    ws.on('close', reason => {
      clearInterval(tick);
      logger.log({
        level: 'info',
        label: 'Server connection close',
        message: {
          namespaceUUID: this.namespaceUUID,
          connectionUUID: this.connectionUUID,
          'connection close': reason
        }
      });

      this.disconnecting(this);
    });
    ws.on('error', error => {
      logger.log({
        level: 'error',
        label: 'Server connection',
        message: { connectionUUID: this.connectionUUID, error: error }
      });
    });

    const onMessage = (ws, message) => {
      const { error, msg } = this.protocol.deSerialize(message);

      if (error) {
        logger.log({
          level: 'error',
          label: 'message',
          message: {
            namespaceUUID: this.namespaceUUID,
            connectionUUID: this.connectionUUID,
            error: 'parser error'
          }
        });
        //        ws.close(4999); // when error
      } else {
        try {
          ws.send(this.protocol.serialize(msg));
        } catch (error) {
          logger.log({
            level: 'error',
            label: 'message send',
            message: {
              namespaceUUID: this.namespaceUUID,
              connectionUUID: this.connectionUUID,
              error: error
            }
          });
        }
        logger.log({
          level: 'info',
          label: 'message send',
          message: {
            namespaceUUID: this.namespaceUUID,
            connectionUUID: this.connectionUUID,
            msg: msg
          }
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
