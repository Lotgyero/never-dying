/*
  service   :  channelControl
  subsystem :  storage
  model     :  participan
  action    :  leave
 */

import { logger } from 'logger';
import { participantScheme } from './scheme';

const leave = item => {
  let result;
  if (item) {
    const { channelUUID, participantUUID } = item;
    if (channelUUID && participantUUID) {
      participantScheme
        .update(
          {
            participantDateLeave: new Date()
          },
          {
            where: {
              channelUUID,
              participantUUID
            }
          }
        )
        .then(res => {
          result = {
            service: 'channelControl',
            subsystem: 'storage',
            action: 'leave',
            data: {
              uuid: res.dataValues.uuid,
              channelUUID: res.dataValues.channelUUID,
              participantUUID: res.dataValues.participantUUID,
              participantDateLeave: res.dataValues.participantDateLeave
            }
          };
          logger.log({
            level: 'info',
            label: 'channelControl storage participan leave',
            message: { status: 'success', data: res.dataValues }
          });
        })
        .catch(error => {
          result = {
            service: 'channelControl',
            subsystem: 'storage',
            action: 'leave',
            data: null,
            error: {
              message: 'channelControl participant leave error',
              data: error
            }
          };
          logger.log({
            level: 'error',
            label: 'channelControl storage participan leave',
            message: { status: 'error', data: error }
          });
        });
    } else {
      result = {
        service: 'channelControl',
        subsystem: 'storage',
        action: 'leave',
        data: null,
        error: {
          message: 'channelControl storage participant leave not full define',
          data: {
            channelUUID,
            participantUUID
          }
        }
      };
      logger.log({
        level: 'error',
        label: 'channelControl storage participant leave',
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
      action: 'leave',
      data: null,
      error: {
        message: 'channelControl storage participant leave is null',
        data: null
      }
    };
    logger.log({
      level: 'error',
      label: 'channelControl storage participant leave',
      message: {
        status: 'error',
        data: 'channelControl storage participant leave null data'
      }
    });
  }
  return result;
};

export { leave };
