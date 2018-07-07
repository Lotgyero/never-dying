/*
  service   :  participantControl
  subsystem :  storage
  model     :  participant
  action    :  create
*/

import { logger } from 'logger';
import { participantScheme } from './scheme';

import { Result } from 'local-utils';
const r = new Result({
  service:   'participantControl',
  module:    '',
  system:    'storage',
  subsystem: 'participant',
  action:    'create'
});


const create = item => {
  let result;
  if (item) {

    const {
      participantUUID,
      participantLogin,
      participantPasswordHash } = item;

    const data = {
      participantUUID,
      participantLogin,
      participantPasswordHash: participantPasswordHash ? true: false };

    if (participantUUID && participantLogin && participantPasswordHash) {
      participantScheme
        .create({
          participantUUID,
          participantLogin,
          participantPasswordHash
        })
        .then(res => {
          result = r.result({
            data: {
              participantUUID: res.dataValues.participantUUID,
              participantLogin: res.dataValues.participantLogin,
              participantPasswordHash: res.dataValues.participantPasswordHash
                ? true
                : false
            },
            error: null
          });

        })
        .catch(error => {
          result ={
            data: null,
            error: {
              data: data,
              error: error
            }
          };
        });

    } else {
      result = r.result({
        data: null,
        error:{
          data: data,
          message: 'not full define'
        }
      });
    }
  } else {
    result = r.result({
      data: null,
      error:{
        data: null
      }
    });
  }
  return result;
};

export { create };
