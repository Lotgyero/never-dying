/*
  service   :  channelControl
  subsustem :  storage
  model     :  channel
  action    :  delete
 */

import { logger } from 'logger';
import { channelScheme } from './scheme';

const del = item => {
  let result;
  if (item) {
    const { channelUUID, deleterUUID } = item;
    if (channelUUID && deleterUUID) {
      channelScheme.update(
        {
          deleterUUID: deleterUUID
        },
        { where: { channelUUID: channelUUID } }
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
              label: 'channel storage',
              message: { status: 'success', data: res.dataValues }
            });
          })
          .catch(error => {
            result = {
              service: 'channel',
              subsustem: 'storage',
              data: null,
              error: {
                message: 'delete channel error',
                data: error
              }
            };
            logger.log({
              level: 'error',
              label: 'channel storage',
              message: { status: 'error', data: error }
            });
          })
      );
    } else {
      result = {
        service: 'channel',
        subsystem: 'storage',
        data: null,
        error: {
          message: 'channel storage channel not full define for  delete',
          data: {
            channelUUID: channelUUID,
            deleterUUID: deleterUUID
          }
        }
      };

      logger.log({
        level: 'error',
        label: 'channel storage',
        message: {
          status: 'error',
          data: {
            channelUUID: channelUUID,
            deleterUUID: deleterUUID
          }
        }
      });
    }
  } else {
    result = {
      service: 'channel',
      subsystem: 'storage',
      data: null,
      error: {
        message: 'channel storage channel deleting is null',
        data: null
      }
    };
    logger.log({
      level: 'error',
      label: 'channel storage',
      message: {
        status: 'error',
        data: 'channel storage channel deleting null data'
      }
    });
  }
  return result;
};

export { del };
