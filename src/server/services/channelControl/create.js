/*
  service   :  channelControl
  subsystem :  control
  action    :  create
*/

import { Result } from 'local-utils';
const r = new Result({
  service:   'channelControl',
  module:    '',
  system:    '',
  subsystem: 'control',
  action:    'create'
});

import { Channel } from './channel';
import { storage } from './storage';
const cannelStorage = storage.model;


const create = item => {
  let result;
  if (item) {
    const { channelUUID, createrUUID, ownerUUID } = item;
    const data = {
      channelUUID,
      createrUUID,
      ownerUUID,
      channelName: item.channelName,
      channelAbout: item.channelAbout
    };
    if (channelUUID && createrUUID && ownerUUID) {
      const databaseResult = cannelStorage.chanel.create(item);

      if (databaseResult && databaseResult.data && !databaseResult.error) {
        const {
          channelUUID,
          createrUUID,
          ownerUUID,
          channelName,
          channelAbout
        } = databaseResult.data;
        const channel = new Channel({
          channelUUID,
          createrUUID,
          ownerUUID,
          channelName,
          channelAbout
        });

        result = r.result({
          data:{
            channel
          },
          error: null
        });

      } else {
        result = r.result({
          data: null,
          error:{
            data,
            error: databaseResult.error
          }
        });
      }
    } else {
      result = r.result({
        data: null,
        error:{
          data,
          error: 'not full define'
        }
      });
    }
  } else {
    result = r.result({
      data: null,
      error:{
        data: null,
        error: 'not full define'
      }
    });
  }
  return result;
};

export { create };
