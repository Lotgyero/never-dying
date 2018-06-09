/*
  service   :  participantControl
  subsystem :  storage
  model     :  participant
  action    :  authorization
*/

import { logger } from 'logger';
import { participantScheme } from './scheme';

const authorization = item => {
  let result;
  if (item) {
    const { participantLogin, participantPasswordHash } = item;
    if (participantLogin && participantPasswordHash) {
      participantScheme
        .findOne({
          where: {
            participantLogin
          }
        })
        .then(res => {
          if (res && res.dataValues) {
            if (
              res.dataValues.participantPasswordHash === participantPasswordHash
            ) {
              const { participantUUID, patricipantDateLeave } = res.dataValues;
              result = {
                service: 'participantControl',
                subsystem: 'storage',
                action: 'authorization',
                data: {
                  participantUUID,
                  participantLogin,
                  patricipantDateLeave
                },
                error: null
              };
              logger.log({
                level: 'info',
                label: 'participantControl storage participant authorization',
                message: {
                  message: 'participant found',
                  data: {
                    participantUUID,
                    participantLogin,
                    participantPasswordHash: participantPasswordHash
                      ? true
                      : false
                  }
                }
              });
            } else {
              result = {
                service: 'participantControl',
                subsystem: 'storage',
                action: 'authorization',
                data: null,
                error: {
                  message:
                    'participantControl storage participant authorization not found',
                  data: {
                    participantLogin,
                    participantPasswordHash: participantPasswordHash
                      ? true
                      : false
                  }
                }
              };
              logger.log({
                level: 'error',
                label: 'participantControl storage participant authorization',
                message: {
                  status: 'error',
                  message: 'participant not found',
                  data: {
                    participantLogin,
                    participantPasswordHash: participantPasswordHash
                      ? true
                      : false
                  }
                }
              });
            }
          } else {
            result = {
              service: 'participantControl',
              subsystem: 'storage',
              action: 'authorization',
              data: null,
              error: {
                message:
                  'participantControl storage participant authorization not full define',
                data: {
                  dataValues: {
                    participantLogin,
                    participantPasswordHash
                  }
                }
              }
            };
            logger.log({
              level: 'error',
              label: 'participantControl storage participant authorization',
              message: {
                status: 'error',
                message: 'authorization with null data',
                data: null
              }
            });
          }
        });
    } else {
      result = {
        service: 'participantControl',
        subsystem: 'storage',
        action: 'authorization',
        data: null,
        error: {
          message:
            'participantControl storage participant authorization is null',
          data: null
        }
      };
      logger.log({
        level: 'error',
        label: 'participantControl storage participant authorization',
        message: {
          status: 'error',
          message: 'authorization with null data',
          data: null
        }
      });
    }
  }
  return result;
};

export { authorization };
