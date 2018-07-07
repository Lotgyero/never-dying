import { channelScheme } from './scheme';

import { Result } from 'local-utils';
const r = new Result({
  service:   'channelControl',
  module:    '',
  system:    'storage',
  subsystem: 'channel',
  action:    'create'
});

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
    const data={
      channelUUID,
      createrUUID,
      ownerUUID,
      nameChannel,
      aboutChannel
    };
    if (channelUUID && createrUUID && ownerUUID) {
      channelScheme
        .create(data)
        .then(res => {
          result = r.result({
            data:{
              dataValues: res.dataValues,
              channelUUID: res.dataValues.channelUUID,
              createrUUID: res.dataValues.createrUUID,
              ownerUUID: res.dataValues.ownerUUID,
              nameChannel: res.dataValues.nameChannel,
              aboutChannel: res.dataValues.aboutChannel,
              deleteByUUID: res.dataValues.deleteByUUID,
              dateDestroy: res.dataValues.dateDestroy
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
        });
    } else {
      result=r.result({
        data: null,
        error: {
          data: data,
          error:{
            message: 'not full define'
          }
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

export { create };
