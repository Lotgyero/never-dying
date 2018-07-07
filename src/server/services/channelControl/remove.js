/*
  service   :  channelControl
  subsystem :  control
  action    :  remove
*/

import { logger } from 'logger';

import { storage } from './storage';
const channelStorage = storage.model;

import { Result } from 'local-utils';
const r = new Result({
  service:   'channelControl',
  module:    '',
  system:    '',
  subsystem: 'control',
  action:    'remove'
});

const remove = item => {
  let result;
  if (item) {
    const { channelUUID, deleterUUID } = item;
    const data = {channelUUID, deleterUUID};
    if (channelUUID && deleterUUID) {
      const databaseResult = channelStorage.channel.remove(item);
      if (databaseResult && databaseResult.data) {
        if(!databaseResult.error){
          const {
            channelUUID,
            createrUUID,
            ownerUUID,
            nameChannel,
            aboutChannel,
            deleteByUUID
          } = databaseResult.data;
          const resData = {
            channelUUID,
            createrUUID,
            ownerUUID,
            nameChannel,
            aboutChannel,
            deleteByUUID
          };
          result = r.result({
            data: resData,
            error: null
          });
        } else {
          result = r.result({
            data: null,
            error:{
              data,
              message: 'database error',
              error: databaseResult.error
            }
          });
        }
      } else {
        result = r.result({
          data: null,
          error:{
            data,
            message: 'not result'
          }
        });
      }
    } else {
      result =r.result({
        data: null,
        error:{
          data,
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

export { remove };
