/*
  service   :  channelControl
  subsustem :  storage
  model     :  participan
  action    :  add
 */

import { logger } from 'logger';
import { participantScheme } from './scheme';

const add = item => {
  let result;
  if (item) {
    const { channelUUID, participanUUID } = item;
    if (channelUUID && participanUUID) {
      participantScheme
        .create({
          channelUUID: channelUUID,
          participanUUID: participanUUID
        })
        .then(res => {
          result = {
            service: 'channel',
            subsystem: 'storage',
            data: {
              channelUUID: `${res.dataValues.channelUUID}`,
              participanUUID: `${res.dataValues.participanUUID}`
            }
          };
          logger.log({
            level: 'info',
            label: 'channel storage participant'
          });
        });
    } else {
      result = {
        service: 'channel',
        subsystem: 'storage',
        data: null,
        error: {
          channelUUID: channelUUID,
          participanUUID: participanUUID
        }
      };
    }
  } else {
    result = {
      service: 'channel',
      subsystem: 'storage',
      data: null,
      error: { message: 'addind participamt' }
    };
    logger.log({
      level: 'error',
      label: 'channel storage participant',
      message: {
        status: 'error',
        data: 'adding null data'
      }
    });
  }
  return result;
};

export { add };
