/*
  local-utils
*/

import { logger } from 'logger';

class Result{
  constructor({service,module, system, subsystem, action}){
    this.service = service;
    this.module = module;
    this.system = system;
    this.subsystem = subsystem;
    this.action = action;
  }
  result({uuid, data, error}){
    logger.log({
      level: error? 'error': 'info',
      label: `${this.service} ${this.module} ${this.system} ${this.subsystem} ${this.action}`,
      message:{uuid, data, error}
    });
    return{
      serviceInfo:{
        servive: this.service,
        module: this.module,
        system: this.system,
        subsystem: this.subsystem,
        action: this.action
      },
      uuid: uuid,
      data: data,
      error: error
    };
  }
}

export { Result }
