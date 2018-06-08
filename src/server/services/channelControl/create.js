/*
  service   :  channelControl
  subsystem :  control
  action    :  create
*/
import { logger } from 'logger';

import { storage } from './storage';
const cannelStorage = storage.model;

import { Channel } from './channel';

const create = item => {
  let result;
  const { channelUUID, createrUUID, ownerUUID } = item;

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
      result = {
        service: 'channelControl',
        subsystem: 'control',
        action: 'create',
        data: {
          channelUUID,
          createrUUID,
          ownerUUID,
          channelName,
          channelAbout
        },
        error: null
      };
      logger.log({
        level: 'info',
        label: 'channelControl channel create',
        message: {
          status: 'success',
          data: databaseResult
        }
      });
    }
  } else {
    result = {
      service: 'channelControl',
      subsystem: 'control',
      action: 'create',
      data: null,
      error: {
        message: 'channelControl channel create is null ',
        data: {}
      }
    };
    logger.log({
      level: 'error',
      label: 'channelControl channel create',
      message: {
        status: 'error',
        data: 'adding mull data',
        dataValues: {
          channelUUID,
          createrUUID,
          ownerUUID
        }
      }
    });
  }
  return result;
};

export { create };
