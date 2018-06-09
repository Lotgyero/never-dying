/*
  service   :  channelControl
  subsystem :  control
  action    :  remove
*/

import { logger } from 'logger';

import { storage } from './storage';
const channelStorage = storage.model;

const remove = item => {
  let result;
  if (item) {
    const { channelUUID, deleterUUID } = item;
    if (channelUUID && deleterUUID) {
      const databaseResult = channelStorage.channel.remove(item);

      if (databaseResult && databaseResult.data && !databaseResult.error) {
        const {
          channelUUID,
          createrUUID,
          ownerUUID,
          nameChannel,
          aboutChannel,
          deleteByUUID
        } = databaseResult.data;
      } else {
        result = {
          service: 'channelControl',
          subsystem: 'control',
          action: 'remove',
          data: null,
          error: {
            message: 'database error ',
            data: null
          }
        };
        logger.log({
          level: 'error',
          label: 'channelControl channel remove',
          message: {
            status: 'error',
            databaseResult: databaseResult ? databaseResult.error : null
          }
        });
      }
    } else {
      result = {
        service: 'channelControl',
        subsystem: 'control',
        action: 'remove',
        data: null,
        error: {
          message: 'not full define ',
          data: null
        }
      };
      logger.log({
        level: 'error',
        label: 'channelControl channel remove',
        message: {
          status: 'error',
          data: {
            dataValues: {
              channelUUID,
              deleterUUID
            }
          }
        }
      });
    }
  } else {
    result = {
      service: 'channelControl',
      subsystem: 'control',
      action: 'remove',
      data: null,
      error: {
        message: 'is null ',
        data: {}
      }
    };
    logger.log({
      level: 'error',
      label: 'channelControl channel remove',
      message: {
        status: 'error',
        data: 'null data'
      }
    });
  }
  return result;
};

export { remove };
