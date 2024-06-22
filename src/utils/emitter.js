import { EventEmitter } from 'fbemitter';
export const eventEmitter = new EventEmitter();

const confirm = (title, content, confirmCb) => {
    eventEmitter.emit('confirm', {
        title,
        content,
        confirmCb,
    });
};

const emitter = { confirm };

export default emitter;
