/*
  service   :  channelControl
  subsustem :  channel
  action    :  add
*/
import { logger } from 'logger';

import { storage } from '../storage';
const cannelStorage = storage.model;

const add = (participantsOld, participant) => {
  const databaseResult = cannelStorage.participant.add(participant);
  let result;

  if (databaseResult && databaseResult.data) {
    const { channelUUID, participanUUID } = databaseResult.data;
    if (channelUUID && participanUUID) {
      participan;
    }
  }

  logger.log({
    level: 'info',
    label: 'channel add participant',
    message: result
  });
  // FiX condition processing

  participants.push(participant);

  logger.log({
    level: 'info',
    label: 'channel add participant',
    message: { uuid: this.uuid, participant: participant }
  });
  return { participants, result };
};

export { add };
