import { EventEmitter } from 'events';
import {register} from '../../dispatchers/AppDispatcher.js';

const EVENT_CHANGE = 'CHANGE';

export default class AbstractStore extends EventEmitter {

  constructor() {
    super();
  }

  subscribe(actionSubscribe) {
    this._dispatchToken = register(actionSubscribe());
  }

  get dispatchToken() {
    return this._dispatchToken;
  }

  emitChange() {
    this.emit(EVENT_CHANGE);
  }

  addChangeListener(cb) {
    this.on(EVENT_CHANGE, cb)
  }

  removeChangeListener(cb) {
    this.removeListener(EVENT_CHANGE, cb);
  }
}