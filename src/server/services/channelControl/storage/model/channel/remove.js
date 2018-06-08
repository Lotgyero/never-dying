/*
  service   :  channelControl
  subsustem :  storage
  model     :  channel
  action    :  delete
 */

import { logger } from 'logger';
import { channelScheme } from './scheme';

const remove = item => {
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
              label: 'channel storage ',
              message: { status: 'success', data: res.dataValues }
            });
          })
          .catch(error => {
            result = {
              service: 'channel',
              subsustem: 'storage',
              data: null,
              error: {
                message: 'channel remove error',
                data: error
              }
            };
            logger.log({
              level: 'error',
              label: 'channel storage channel remove',
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
          message: 'channel storage channel remove not full define',
          data: {
            channelUUID: channelUUID,
            deleterUUID: deleterUUID
          }
        }
      };

      logger.log({
        level: 'error',
        label: 'channel storage channel remove',
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
        message: 'channel storage channel remove is null',
        data: null
      }
    };
    logger.log({
      level: 'error',
      label: 'channel storage chanel remove',
      message: {
        status: 'error',
        data: 'channel storage channel remove null data'
      }
    });
  }
  return result;
};

export { remove };
