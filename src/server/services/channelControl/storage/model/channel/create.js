/*
  service   :  channelControl
  subsystem :  storage
  model     :  channel
  action    :  create
 */

import { logger } from 'logger';
import { channelScheme } from './scheme';

const create = item => {
  let result;
  if (item) {
    const {
      channelUUID,
      createrUUID,
      ownerUUID,
      nameChannel,
      aboutChannel
    } = item;
    if (channelUUID && createrUUID && ownerUUID) {
      channelScheme
        .create({
          channelUUID: channelUUID,
          createrUUID: createrUUID,
          ownerUUID: ownerUUID,
          nameChannel: nameChannel,
          aboutChannel: aboutChannel
        })
        .then(res => {
          result = {
            service: 'channel',
            subsystem: 'storage',
            action: 'create',
            data: {
              channelUUID: res.dataValues.channelUUID,
              createrUUID: res.dataValues.createrUUID,
              ownerUUID: res.dataValues.ownerUUID,
              nameChannel: res.dataValues.nameChannel,
              aboutChannel: res.dataValues.aboutChannel,
              deleteByUUID: res.dataValues.deleteByUUID,
              dateDestroy: res.dataValues.dateDestroy
            },
            error: null
          };

          logger.log({
            level: 'info',
            label: 'channelControl storage channel create',
            message: { status: 'success', data: res.dataValues }
          });
        })
        .catch(error => {
          result = {
            service: 'channel',
            subsystem: 'storage',
            action: 'create',
            data: null,
            error: {
              message: 'channelControl storage channel create error',
              data: error
            }
          };
          logger.log({
            level: 'error',
            label: 'channelControl storage channel create',
            message: { status: 'error', data: error }
          });
        });
    } else {
      result = {
        service: 'channel',
        subsystem: 'storage',
        action: 'create',
        data: null,
        error: {
          message: 'channelControl storage channel create not full define',
          data: {
            channelUUID,
            createrUUID,
            ownerUUID
          }
        }
      };
      logger.log({
        level: 'info',
        label: 'channelControl storage channel create',
        message: {
          status: 'error',
          data: {
            channelUUID: channelUUID,
            createrUUID: createrUUID,
            ownerUUID: ownerUUID
          }
        }
      });
    }
  } else
    result = {
      service: 'channel',
      subsystem: 'storage',
      action: 'create',
      data: null,
      error: { messege: 'channel storage channel create  is null' }
    };
  logger.log({
    level: 'error',
    label: 'channelControl storage channel create',
    message: {
      status: 'error',
      data: 'adding null data'
    }
  });
  return result;
};

export { create };
