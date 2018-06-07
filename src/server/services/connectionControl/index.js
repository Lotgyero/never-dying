import { Server } from 'uws';

import uuidv4 from 'uuid/v4';
import uuidv5 from 'uuid/v5';
const now = uuidv4();

import { logger } from '../../logger';

// import config from 'config';

import { Connection } from './connection';

class ConnectionControl {
  constructor(namespace = now) {
    this.namespace = namespace;
    this.id = uuidv5(uuidv4(), namespace);
    this.wss = null;
    let connections = [];

    this.connecting = ws => {
      const newConnetion = new Connection(ws, this.disconnecting);
      connections.push(newConnetion);
      logger.log({
        level: 'info',
        label: 'Server connection',
        message: {
          idConnectionControl: this.id,
          count: connections.length,
          id_newconnection: newConnetion.id
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
        label: 'Server connection close',
        message: {
          idConnectionControl: this.id,
          cont: connections.length,
          id_closed_connection: connect.id
        }
      });
    };
    this.connections = () => {
      //for develop only
      logger.log({
        level: 'info',
        label: 'Get All connections for Develop Only!',
        message: { idConnectionControl: this.id, allConnections: connections }
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
