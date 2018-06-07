class Protocol {
  constructor(logger) {
    this.logger = logger;
  }
  deSerialize(message) {
    let myJson = null;
    try {
      myJson = JSON.parse(message);
      this.logger.log({
        level: 'info',
        label: 'parser JSON',
        message: myJson
      });
    } catch (err) {
      this.logger.log({
        level: 'error',
        label: 'parser JSON',
        mesage: err
      });
      myJson = null;
      return { error: 'error', msg: null };
    }
    return { error: null, msg: myJson };
  }
  serialize(message) {
    return JSON.stringify(message);
  }
}

export { Protocol };
