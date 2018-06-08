/*
  service   :  channelControl
  subsustem :  storage
  model     :  participan
  action    :  leave
 */

import { logger } from 'logger';
import { participantScheme } from './scheme';

const leave = item => {
  let result;
  if (item) {
    const { channelUUID, participanUUID } = item;
    if (channelUUID && participanUUID) {
      participantScheme
        .update(
          {
            dateLeave: new Date()
          },
          {
            where: {
              channelUUID: channelUUID,
              participanUUID: participanUUID
            }
          }
        )
        .then(res => {
          result = {
            service: 'channel',
            subsustem: 'storage',
            data: {
              uuid: `${res.dataValues.uuid}`,
              channelUUID: `${res.dataValues.channelUUID}`,
              participanUUID: `${res.dataValues.participanUUID}`,
              dateLeave: `${res.dataValues.dateLeave}`
            }
          };
          logger.log({
            level: 'info',
            label: 'channel storage participan leave',
            message: { status: 'success', data: res.dataValues }
          });
        })
        .catch(error => {
          result = {
            service: 'channel',
            subsustem: 'storage',
            data: null,
            error: {
              message: 'channel participant leave error',
              data: error
            }
          };
          logger.log({
            level: 'error',
            label: 'channel storage participan leave',
            message: { status: 'error', data: error }
          });
        });
    } else {
      result = {
        service: 'channel',
        subsustem: 'storage',
        data: null,
        error: {
          message: 'channel storage participant leave not full define',
          data: {
            channelUUID: channelUUID,
            participanUUID: participanUUID
          }
        }
      };
      logger.log({
        level: 'error',
        label: 'channel storage participan leave',
        message: {
          status: 'error',
          data: {
            channelUUID: channelUUID,
            participanUUID: participanUUID
          }
        }
      });
    }
  } else {
    result = {
      service: 'channel',
      subsustem: 'storage',
      data: null,
      error: {
        message: 'channel storage participant leave is null',
        data: null
      }
    };
    logger.log({
      level: 'error',
      label: 'channel storage leave',
      message: {
        status: 'error',
        data: 'channel storage participant leave null data'
      }
    });
  }
  return result;
};

export { leave };
