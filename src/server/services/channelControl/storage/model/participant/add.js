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
            label: 'channel storage participant',
            message: {
              status: 'success',
              data: {
                dataValues: res.dataValues
              }
            }
          });
        })
        .catch(error => {
          result = {
            service: 'channel',
            subsystem: 'storage',
            data: null,
            error: {
              message: 'adding pacipiant',
              data: {
                dataValues: {
                  channelUUID: channelUUID,
                  participanUUID: participanUUID
                },
                error: error
              }
            }
          };
          logger.log({
            level: 'error',
            label: 'channel storage participant',
            message: {
              status: 'error',
              data: error
            }
          });
        });
    } else {
      result = {
        service: 'channel',
        subsystem: 'storage',
        data: null,
        error: {
          message: 'some null value',
          data: {
            dataValues: {
              channelUUID: channelUUID,
              participanUUID: participanUUID
            }
          }
        }
      };
      logger.log({
        level: 'error',
        label: 'channel storage participant',
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
      subsystem: 'storage',
      data: null,
      error: { message: 'adding participant', data: null }
    };
    logger.log({
      level: 'error',
      label: 'channel storage participant',
      message: {
        status: 'error',
        message: 'adding null data',
        data: null
      }
    });
  }
  return result;
};

export { add };
