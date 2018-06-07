/*
  service   :  channelControl
  subsustem :  storage
  model     :  channel
  action    :  add
 */

import { logger } from 'logger';

const add = item => {
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
      this.channel
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
            data: {
              channelUUID: `${res.dataValues.channelUUID}`,
              createrUUID: `${res.dataValues.createrUUID}`,
              ownerUUID: `${res.dataValues.ownerUUID}`,
              nameChannel: `${res.dataValues.nameChannel}`,
              aboutChannel: `${res.dataValues.aboutChannel}`,
              deleteByUUID: `${res.dataValues.deleteByUUID}`
            },
            error: null
          };

          logger.log({
            level: 'info',
            label: 'channel storage channel',
            message: { status: 'success', data: res.dataValues }
          });
        })
        .catch(error => {
          result = {
            service: 'channel',
            subsystem: 'storage',
            data: null,
            error: {
              message: 'adding channel error',
              data: error
            }
          };
          logger.log({
            level: 'error',
            label: 'channel storage channel',
            message: { status: 'error', data: error }
          });
        });
    } else {
      result = {
        service: 'channel',
        subsystem: 'storage',
        data: null,
        error: {
          message: 'channel storage channel not full define',
          data: {
            channelUUID: channelUUID,
            createrUUID: createrUUID,
            ownerUUID: ownerUUID
          }
        }
      };
      logger.log({
        level: 'info',
        label: 'channel storage',
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
      data: null,
      error: { messege: 'channel storage channel adding  is null' }
    };
  logger.log({
    level: 'error',
    label: 'channel storage',
    message: {
      status: 'error',
      data: 'adding null data'
    }
  });
  return result;
};

export { add };
