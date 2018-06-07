/*
  service   :  channelControl
  subsustem :  storage
  model     :  channel
  action    :  delete
 */

import { logger } from 'logger';

const del = item => {
  let result;
  if (item) {
    const {} = item;
  } else {
    result = {
      service: 'channel',
      subsystem: 'storage',
      data: null,
      error: {
        message: 'channel storage channel deleting is null'
      }
    };
    logger.log({
      level: 'error',
      label: 'channel storage',
      message: {
        status: 'error',
        data: 'deleting null data'
      }
    });
  }
  return result;
};

export { del };
