/*
  service   :  participantControl
  subsystem :  storage
  model     :  participant
  action    :  authorization
*/


import { participantScheme } from './scheme';

import { Result } from 'local-utils';
const r = new Result({
  service:   'participantControl',
  module:    '',
  system:    'storage',
  subsystem: 'participant',
  action:    'authorization'
});

const authorization = item => {
  let result;
  if (item) {
    const {
      participantLogin,
      participantPasswordHash
    } = item;

    const data = {
      participantLogin,
      participantPasswordHash: participantPasswordHash ? true: false
    };

    if (participantLogin && participantPasswordHash) {
      const data = {
        participantLogin,
        participantPasswordHash: participantPasswordHash ? true: false
      };
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
              result ={
                data: {
                  participantLogin,
                  participantUUID,
                  patricipantDateLeave
                },
                error: null
              };

            } else {
              result = {
                data: null,
                error: {
                  data
                }
              };
            }
          } else {
            result = r.result({
              data: null,
              error:{
                data: data
              }
            });
          }
        });
    } else {
      result = r.result({
        data: null,
        error: {
          data: null
        }
      });
    }
  }
  return result;
};

export { authorization };
