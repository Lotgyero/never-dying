/*
  service   :  channelControl
  subsystem :  storage
  model     :  participant
  action    :  join
 */

import { participantScheme } from './scheme';
import { Result } from 'local-utils';

const r = new Result({
  service:   'channelControl',
  module:    '',
  system:    'storage',
  subsystem: 'participan',
  action:    'join'
});

const join = item => {
  let result;
  if (item) {
    const { channelUUID, participantUUID } = item;
    const data = { channelUUID, participantUUID };
    if (channelUUID && participantUUID) {
      participantScheme
        .create({
          channelUUID,
          participantUUID
        })
        .then(res => {
          result = r.Result({
            data:{
              channelUUID: res.dataValues.channelUUID,
              participantUUID: res.dataValues.participantUUID,
              dataValues: res.dataValues,
              data: data
            },
            error: null
          });
        })
        .catch(error => {
          result = r.Result({
            data: null,
            error:{
              data: null,
              error: {
                data: data,
                error: error
              }
            }
          });
        });
    } else {
      result = r.Result({
        data: null,
        error:{
          data: data,
          error:{
            message: 'some value is null'
          }
        }
      });
    }
  } else {
    result = r.Result({
      data: null,
      error:{
        data: null,
        message: 'none data'
      }
    });
  }
  return result;
};

export { join };
