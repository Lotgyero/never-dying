import { logger } from './logger';
// import { ConnectionControl } from './connectionControl';
import { service } from './services';

// const currentConnection = new ConnectionControl();

import { serviceConnectionControl } from './services/connectionControl';
serviceConnectionControl.start();

import { channelControl } from './services/channelControl';

import { participantControl } from './services/participantControl';

const test = participantControl.create({
  participantLogin: 'test',
  participantPassword: 'test'
});

console.log({ test });
// const tik = setInterval(() => {
//   console.log(currentConnection.Connections);
// }, 1500);
// currentConnection.Stop();
