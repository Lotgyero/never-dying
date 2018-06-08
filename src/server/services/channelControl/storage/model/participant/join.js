/*
  service   :  channelControl
  subsystem :  storage
  model     :  participant
  action    :  join
 */

import { logger } from 'logger';
import { participantScheme } from './scheme';

const join = item => {
  let result;
  if (item) {
    const { channelUUID, participantUUID } = item;
    if (channelUUID && participantUUID) {
      participantScheme
        .create({
          channelUUID,
          participantUUID
        })
        .then(res => {
          result = {
            service: 'channelControl',
            subsystem: 'storage',
            action: 'join',
            data: {
              channelUUID: res.dataValues.channelUUID,
              participantUUID: res.dataValues.participantUUID
            }
          };
          logger.log({
            level: 'info',
            label: 'channelControl storage participant join',
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
            service: 'channelControl',
            subsystem: 'storage',
            action: 'join',
            data: null,
            error: {
              message: 'pacipiant join',
              data: {
                dataValues: {
                  channelUUID,
                  participantUUID
                },
                error: error
              }
            }
          };
          logger.log({
            level: 'error',
            label: 'channelControl storage participant join',
            message: {
              status: 'error',
              data: error
            }
          });
        });
    } else {
      result = {
        service: 'channelControl',
        subsystem: 'storage',
        action: 'join',
        data: null,
        error: {
          message: 'some null value when join',
          data: {
            dataValues: {
              channelUUID,
              participantUUID
            }
          }
        }
      };
      logger.log({
        level: 'error',
        label: 'channelControl storage participant join',
        message: {
          status: 'error',
          data: {
            channelUUID,
            participantUUID
          }
        }
      });
    }
  } else {
    result = {
      service: 'channelControl',
      subsystem: 'storage',
      action: 'join',
      data: null,
      error: { message: 'join participant', data: null }
    };
    logger.log({
      level: 'error',
      label: 'channelControl storage participant join',
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
