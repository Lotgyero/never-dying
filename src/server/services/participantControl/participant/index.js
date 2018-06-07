import uuidv4 from 'uuid/v4';
import uuidv5 from 'uuid/v5';
const now = uuidv4();

class Participant {
  constructor(namespace = now) {
    this.id = uuidv5(uuidv4, namespace);
  }
  add(login, password) {}
}

export { Participant };
