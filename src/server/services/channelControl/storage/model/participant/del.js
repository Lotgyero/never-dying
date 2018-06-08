/*
  service   :  channelControl
  subsustem :  storage
  model     :  participan
  action    :  del
 */

import { logger } from 'logger';
import { participantScheme } from './scheme';

const del = item => {
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
            label: 'channel storage',
            message: { status: 'success', data: res.dataValues }
          });
        })
        .catch(error => {
          result = {
            service: 'channel',
            subsustem: 'storage',
            data: null,
            error: {
              message: 'delete participant error',
              data: error
            }
          };
          logger.log({
            level: 'error',
            label: 'channel storage',
            message: { status: 'error', data: error }
          });
        });
    } else {
      result = {
        service: 'channel',
        subsustem: 'storage',
        data: null,
        error: {
          message: 'channel storage participant not full define for delete',
          data: {
            channelUUID: channelUUID,
            participanUUID: participanUUID
          }
        }
      };
      logger.log({
        level: 'error',
        label: 'storage',
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
        message: 'channel storage participant deleting is null',
        data: null
      }
    };
    logger.log({
      level: 'error',
      label: 'channel storage',
      message: {
        status: 'error',
        data: 'channel storage participant deletin null data'
      }
    });
  }
  return result;
};

export { del };
