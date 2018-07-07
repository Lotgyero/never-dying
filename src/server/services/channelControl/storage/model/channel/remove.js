/*
  service   :  channelControl
  subsystem :  storage
  model     :  channel
  action    :  remove
*/

import { channelScheme } from './scheme';

import { Result } from 'local-utils';
const r = new Result({
  service:   'channelControl',
  module:    '',
  system:    'storage',
  subsystem: 'channel',
  action:    'remove'
});

const remove = item => {
  let result;
  if (item) {
    const { channelUUID, deleterUUID } = item;
    const data = { channelUUID, deleterUUID };
    if (channelUUID && deleterUUID) {
      channelScheme.update(
        {
          deleterUUID,
          deleteDate: new Date()
        },
        { where: { channelUUID } }
          .then(res => {
            result = r.result({
              data: {
                data,
                dataValues: res.dataValues,
                channelUUID: res.dataValues.channelUUID,
                createrUUID: res.dataValues.createrUUID,
                ownerUUID: res.dataValues.ownerUUID,
                nameChannel: res.dataValues.nameChannel,
                aboutChannel: res.dataValues.aboutChannel,
                deleteByUUID: res.dataValues.deleteByUUID
              },
              error: null
            });
          })
          .catch(error => {
            result = r.result({
              data: null,
              error:{
                data: data,
                error: error
              }
            });
          })
      );
    } else {
      result = r.result({
        data: null,
        error: {
          data: data
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
