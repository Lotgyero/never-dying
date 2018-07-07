/*
  service   :  participantControl
  subsystem :  patricipant
  action    :  create
*/

import uuidv4 from 'uuid/v4';
import uuidv5 from 'uuid/v5';

import { participant } from './participant';

import { storage } from './storage';
const patricipantStorage = storage.model;

import { Result } from 'local-utils';
const r = new Result({
  service:   'participantControl',
  module:    '',
  system:    '',
  subsystem: 'patricipant',
  action:    'create'
});

const create = async item => {
  let result;
  if (item) {
    const {
      namespaceUUID,
      participantLogin,
      participantPasswordHash
    } = item;
    const data ={
      namespaceUUID,
      participantLogin,
      participantPasswordHash: participantPasswordHash ? true : false
    };
    if (participantLogin && participantPasswordHash && namespaceUUID) {
      const participantUUID = uuidv5(uuidv4(), namespaceUUID);
      const databaseResult = await patricipantStorage.participant.create({
        participantUUID,
        participantLogin,
        participantPasswordHash
      });
      result = r.result({
        data: {
          participantUUID: databaseResult.dataValues.participantUUID,
          participantLogin: databaseResult.dataValues.participantLogin,
          participantPasswordHash: databaseResult.dataValues.participantPasswordHash ? true : false
        } ,
        error: null
      });
    } else {
      result = r.result({
        data: null,
        error: {
          data: data,
          message: 'not full define'
        }
      });
    }
  } else {
    result ={
      data: null,
      error:{
        data: null,
        message: 'data null'
      }
    };
  }
  return result;
};

export { create };
