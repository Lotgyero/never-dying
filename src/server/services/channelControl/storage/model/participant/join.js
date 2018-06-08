/*
  service   :  channelControl
  subsustem :  storage
  model     :  participan
  action    :  join
 */

import { logger } from 'logger';
import { participantScheme } from './scheme';

const join = item => {
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
            label: 'channel storage participant join',
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
              message: 'pacipiant join',
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
            label: 'channel storage participant join',
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
          message: 'some null value when join',
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
        label: 'channel storage participant join',
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
      error: { message: 'join participant', data: null }
    };
    logger.log({
      level: 'error',
      label: 'channel storage participant join',
      message: {
        status: 'error',
        message: 'join null data',
        data: null
      }
    });
  }
  return result;
};

export { join };
