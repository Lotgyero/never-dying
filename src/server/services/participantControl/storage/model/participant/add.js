/*
  service   :  participantControl
  subsustem :  storage
  model     :  participan
  action    :  add
 */

import { logger } from 'logger';
import { participantScheme } from './scheme';

const add = item => {
  let result;
  if (item) {
    const { participanUUID, participanLogin, participanPasswordHash } = item;
    if (participanUUID && participanLogin && participanPasswordHash) {
      participantScheme
        .create({
          participanUUID: participanUUID,
          participanLogin: participanLogin,
          participanPasswordHash: participanPasswordHash
        })
        .then(res => {
          result = {
            service: 'participan',
            subsystem: 'storage',
            data: {
              participanUUID: `${res.dataValues.participanUUID}`
            }
          };
          logger.log({
            level: 'info',
            label: 'participant storage participant',
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
            service: 'participan',
            subsystem: 'storage',
            data: null,
            error: {
              message: 'adding participant error',
              data: error
            }
          };
          logger.log({
            level: 'error',
            label: 'participant storage participant',
            message: {
              status: 'error',
              dataValues: {
                participanUUID: participanUUID,
                participanLogin: participanLogin
              },
              data: {
                message: 'adding pacipant error',
                data: error
              }
            }
          });
        });
    } else {
      result = {
        service: 'participan',
        subsystem: 'storage',
        data: null,
        error: {
          message: 'some null value',
          data: {
            dataValues: {
              participanUUID: participanUUID,
              participanLogin: participanLogin,
              participanPasswordHash: participanPasswordHash ? true : false
            }
          }
        }
      };
    }
  } else {
    result = {
      service: 'participan',
      subsystem: 'storage',
      data: null,
      error: {
        message: 'adding participant',
        data: null
      }
    };
    logger.log({
      level: 'error',
      label: 'participant storage participant',
      message: {
        status: 'error',
        data: 'adding null data'
      }
    });
  }
  return result;
};

export { add };
