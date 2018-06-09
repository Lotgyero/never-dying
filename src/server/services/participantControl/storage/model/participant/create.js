/*
  service   :  participantControl
  subsystem :  storage
  model     :  participant
  action    :  create
*/

import { logger } from 'logger';
import { participantScheme } from './scheme';

const create = item => {
  let result;
  if (item) {
    const { participantUUID, participantLogin, participantPasswordHash } = item;
    if (participantUUID && participantLogin && participantPasswordHash) {
      participantScheme
        .create({
          participantUUID,
          participantLogin,
          participantPasswordHash
        })
        .then(res => {
          result = {
            service: 'participantControl',
            subsystem: 'storage',
            action: 'create',
            data: {
              participantUUID: res.dataValues.participantUUID,
              participantLogin: res.dataValues.participantLogin,
              participantPasswordHash: res.dataValues.participantPasswordHash
                ? true
                : false
            }
          };
          logger.log({
            level: 'info',
            label: 'participantControl storage participant create',
            message: {
              status: 'success',
              data: {
                participantUUID: res.dataValues.participantUUID,
                participantLogin: res.dataValues.participantLogin,
                participantPasswordHash: res.dataValues.participantPasswordHash
                  ? true
                  : false
              }
            }
          });
        })
        .catch(error => {
          result = {
            service: 'participantControl',
            subsystem: 'storage',
            action: 'create',
            data: null,
            error: {
              message: 'participantControl storage pacticipant create error',
              data: error
            }
          };
          logger.log({
            level: 'error',
            label: 'participantControl storage participant create',
            message: {
              status: 'error',
              message: 'create error',
              data: {
                participantUUID,
                participantLogin,
                participantPasswordHash: participantPasswordHash ? true : false
              },
              error: error
            }
          });
        });
    } else {
      result = {
        service: 'participantControl',
        subsystem: 'storage',
        action: 'create',
        data: null,
        error: {
          message:
            'participantControl storage participant create not full define',
          data: {
            participantUUID,
            participantLogin,
            participantPasswordHash: participantPasswordHash ? true : false
          }
        }
      };
      logger.log({
        level: 'error',
        label: 'participantControl storage participant create',
        message: {
          status: 'error',
          message: 'adding null data',
          data: {
            participantUUID,
            participantLogin,
            participantPasswordHash: participantPasswordHash ? true : false
          }
        }
      });
    }
  } else {
    result = {
      service: 'participantControl',
      subsystem: 'storage',
      action: 'create',
      data: null,
      error: {
        message: 'participantControl storage participant create is null',
        data: null
      }
    };
    logger.log({
      level: 'error',
      label: 'participantControl storage participant create',
      message: {
        status: 'error',
        message: 'adding null data'
      }
    });
  }
  return result;
};

export { create };
