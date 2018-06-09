/*
  service   :  connectionControl
*/

import { Server } from 'uws';
import config from 'config';

import { logger } from 'logger';

import { Connection } from './connection';

class ConnectionControl {
  constructor() {
    const namespaceUUID = config.get('connectionControl.uuid').namespace;
    this.namespaceUUID = namespaceUUID;

    this.wss = null;
    let connections = [];

    this.connecting = ws => {
      const newConnetion = new Connection(
        namespaceUUID,
        ws,
        this.disconnecting
      );

      connections.push(newConnetion);

      logger.log({
        level: 'info',
        label: 'connectionControl connection',
        message: {
          namespaceUUID: this.namespaceUUID,
          connectionUUID: newConnetion.connectionUUID,
          count: connections.length
        }
      });
    };

    this.disconnecting = connect => {
      const newConnetions = connections.filter(con => {
        return connect !== con;
      });
      connections = newConnetions;
      logger.log({
        level: 'info',
        label: 'connectionControl connection close',
        message: {
          namespaceUUID: this.namespaceUUID,
          id_closed_connection: connect.connectionUUID,
          cont: connections.length
        }
      });
    };
    this.connections = () => {
      //for develop only
      logger.log({
        level: 'info',
        label: 'connectionControl Get All connections for Develop Only!',
        message: {
          namespaceUUID: this.namespaceUUID,
          allConnections: connections
        }
      });
      return connections;
    };
  }
  start(port = 3000) {
    if (!this.wss) {
      this.wss = new Server({
        port: port
      });

      this.wss.on('connection', ws => {
        this.connecting(ws);
      });
    }
    return true; //
  }
  get Connections() {
    return this.connections();
  }
  stop() {
    if (this.wss) {
      let tikCount = 0;
      const tik = setInterval(() => {
        logger.log({
          level: 'info',
          message: {
            idConnectionControl: this.id,
            info: `dir tik ${tikCount}`
          }
        });
        tikCount++;
      }, 100);

      setTimeout(() => {
        clearInterval(tik);
        this.wss.close();
        this.wss = null;
      }, 1000);
    }
  }
}

class ServiceConnectionControl {
  constructor() {
    this.connectionControl = new ConnectionControl();
  }
  start() {
    this.connectionControl.start();
  }
  stop() {
    this.connectionControl.stop();
  }
}

const serviceConnectionControl = new ServiceConnectionControl();

export { serviceConnectionControl };
