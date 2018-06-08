/*
  service   :  channelControl
  subsystem :  storage
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
          deleterUUID,
          deleteDate: new Date()
        },
        { where: { channelUUID } }
          .then(res => {
            result = {
              service: 'channelControl',
              subsystem: 'storage',
              action: 'remove',
              data: {
                channelUUID: res.dataValues.channelUUID,
                createrUUID: res.dataValues.createrUUID,
                ownerUUID: res.dataValues.ownerUUID,
                nameChannel: res.dataValues.nameChannel,
                aboutChannel: res.dataValues.aboutChannel,
                deleteByUUID: res.dataValues.deleteByUUID
              },
              error: null
            };
            logger.log({
              level: 'info',
              label: 'channelControl storage channel remove',
              message: { status: 'success', data: res.dataValues }
            });
          })
          .catch(error => {
            result = {
              service: 'channelControl',
              subsystem: 'storage',
              action: 'remove',
              data: null,
              error: {
                message: 'channelControl storage channel remove error',
                data: error
              }
            };
            logger.log({
              level: 'error',
              label: 'channelControl storage channel remove',
              message: { status: 'error', data: error }
            });
          })
      );
    } else {
      result = {
        service: 'channelControl',
        subsystem: 'storage',
        action: 'remove',
        data: null,
        error: {
          message: 'channelControl storage channel remove not full define',
          data: {
            channelUUID,
            deleterUUID
          }
        }
      };

      logger.log({
        level: 'error',
        label: 'channelControl storage channel remove',
        message: {
          status: 'error',
          data: {
            channelUUID,
            deleterUUID
          }
        }
      });
    }
  } else {
    result = {
      service: 'channelControl',
      subsystem: 'storage',
      action: 'remove',
      data: null,
      error: {
        message: 'channelControl storage channel remove is null',
        data: null
      }
    };
    logger.log({
      level: 'error',
      label: 'channelControl storage chanel remove',
      message: {
        status: 'error',
        data: 'channelControl storage channel remove null data'
      }
    });
  }
  return result;
};

export { remove };
