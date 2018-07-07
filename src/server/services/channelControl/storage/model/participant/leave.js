/*
  service   :  channelControl
  subsystem :  storage
  model     :  participan
  action    :  leave
*/

import { participantScheme } from './scheme';
import { Result } from 'local-utils';

const r = new Result({
  service:   'channelControl',
  module:    '',
  system:    'storage',
  subsystem: 'participan',
  action:    'leave'
});

const leave = item => {
  let result;
  if (item) {
    const { channelUUID, participantUUID } = item;
    const data = { channelUUID, participantUUID };
    if (channelUUID && participantUUID) {
      participantScheme
        .update(
          {
            participantDateLeave: new Date()
          },
          {
            where: data
          }
        )
        .then(res => {
          result = r.Result({
            data:{
              uuid: res.dataValues.uuid,
              channelUUID: res.dataValues.channelUUID,
              participantUUID: res.dataValues.participantUUID,
              participantDateLeave: res.dataValues.participantDateLeave
            },
            error: null
          });
        })
        .catch(error => {
          result = r.Result({
            data: null,
            error: {
              data: data,
              error: error
            }
          });
        });
    } else {
      result = r.Result({
        data: null,
        error:{
          data: data
        }
      });
    }
  } else {
    result ={
      data: null,
      error: {
        data: null
      }
    };
  }
  return result;
};

export { leave };
