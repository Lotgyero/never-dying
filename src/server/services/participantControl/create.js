/*
  service   :  participantControl
  subsystem :  patricipant
  action    :  create
*/

import uuidv4 from 'uuid/v4';
import uuidv5 from 'uuid/v5';

import { logger } from 'logger';

import { participant } from './participant';

import { storage } from './storage';
const patricipantStorage = storage.model;

const create = async item => {
  let result;
  if (item) {
    const { participantLogin, participantPasswordHash, namespaceUUID } = item;
    if (participantLogin && participantPasswordHash && namespaceUUID) {
      const participantUUID = uuidv5(uuidv4(), namespaceUUID);
      const databaseResult = await patricipantStorage.participant.create({
        participantUUID,
        participantLogin,
        participantPasswordHash
      });
    } else {
      result = {
        service: 'participantControl',
        subsystem: 'participant',
        action: 'create',
        data: null,
        error: {
          message: 'participantControl participant create not full define',
          data: {
            namespaceUUID,
            participantLogin,
            participantPasswordHash: participantPasswordHash ? true : false
          }
        }
      };
      logger.log({
        level: 'error',
        label: 'participantControl participant create',
        message: {
          status: 'error',
          message: 'adding null data'
        }
      });
    }
  } else {
    result = {
      service: 'participantControl',
      subsystem: 'participant',
      action: 'create',
      data: null,
      error: {
        message: 'participantControl participant create is null',
        data: null
      }
    };
    logger.log({
      level: 'error',
      label: 'participantControl participant create',
      message: {
        status: 'error',
        message: 'adding null data'
      }
    });
  }
  return result;
};

export { create };
