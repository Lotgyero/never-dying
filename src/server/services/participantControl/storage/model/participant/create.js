/*
  service   :  participantControl
  subsustem :  storage
  model     :  participan
  action    :  create
 */

import { logger } from 'logger';
import { participantScheme } from './scheme';

const create = item => {
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
            label: 'participant storage participant create',
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
              message: 'participant storage pacticipant create error',
              data: error
            }
          };
          logger.log({
            level: 'error',
            label: 'participant storage participant create',
            message: {
              status: 'error',
              dataValues: {
                participanUUID: participanUUID,
                participanLogin: participanLogin
              },
              data: {
                message: 'participant storage participant create  error',
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
          message: 'participan storage participan create not full define',
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
        message: 'participant storage participan create is null',
        data: null
      }
    };
    logger.log({
      level: 'error',
      label: 'participant storage participant create',
      message: {
        status: 'error',
        data: 'adding null data'
      }
    });
  }
  return result;
};

export { create };
