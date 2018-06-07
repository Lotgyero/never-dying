import { logger } from './logger';
// import { ConnectionControl } from './connectionControl';
import { service } from './services';

// const currentConnection = new ConnectionControl();

import { serviceConnectionControl } from './services/connectionControl';
serviceConnectionControl.start();

import { serviceChannelControl } from './services/channelControl';

// const tik = setInterval(() => {
//   console.log(currentConnection.Connections);
// }, 1500);
// currentConnection.Stop();
