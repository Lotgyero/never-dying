/*
  service   :  channelControl
  subsystem :  storage
  model     :  participan
 */


import { participantScheme } from './scheme';
import { join } from './join';
import { leave } from './leave';

class Participant {
  constructor() {
    this.participant = participantScheme;
  }
  join=(item)=>{
    return join(item);
  }
  leave=(item)=>{
    return leave(item);
  }
  search=()=>{}
}

const participant = new Participant();
export { participant };
