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
  if (item) {
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

        const channel = new Channel({
          channelUUID,
          createrUUID,
          ownerUUID,
          channelName,
          channelAbout
        });

        result = {
          service: 'channelControl',
          subsystem: 'control',
          action: 'create',
          data: channel,
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
      } else {
        result = {
          service: 'channelControl',
          subsystem: 'control',
          action: 'create',
          data: null,
          error: {
            message: 'database error',
            data: null
          }
        };
        logger.log({
          level: 'error',
          label: 'channelControl channel create',
          message: {
            status: 'error',
            message: 'database error'
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
          message: 'create not full define ',
          data: null
        }
      };
      logger.log({
        level: 'error',
        label: 'channelControl channel create',
        message: {
          status: 'error',
          data: {
            dataValues: {
              channelUUID,
              createrUUID,
              ownerUUID
            }
          }
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
        message: 'is null',
        data: {}
      }
    };
    logger.log({
      level: 'error',
      label: 'channelControl channel create',
      message: {
        status: 'error',
        data: 'adding null data'
      }
    });
  }
  return result;
};

export { create };
