/*
  service   :  channelControl
  subsystem :  storage
  model     :  participant
  action    :  list
 */

import { participantScheme } from './scheme';

import { Result } from 'local-utils';
const r = new Result({
  service:   'channelControl',
  module:    '',
  system:    'storage',
  subsystem: 'participan',
  action:    'list'
});

const list =(item)=>{
  let result;

  if(item){
    const { channelUUID } = item;
    const data = { channelUUID };
    if(channelUUID){
      participantScheme
        .findAll({
          where:{
            channelUUID
          }
        })
        .then(res =>{
          console.log('for test all participants', res.dataValues);
          result = r.result({
            data: '',
            error: null
          });
        })
        .catch(error=>{
          result = r.result({
            data: null,
            error: {
              data,
              error
            }
          });
        });
    } else {
      result = r.result({
        data: null,
        error: {
          data
        }
      });
    }
  } else {
    result = r.result({
      data: null,
      error: {
        data: null
      }
    });
  }
  return result;
};

export { list };
