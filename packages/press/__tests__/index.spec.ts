import { create } from '@testUtils';
import press from '@any-touch/press';
const PRESS_NAME = 'press';

test(`加载${PRESS_NAME}, 触发一次${PRESS_NAME}`, async done => {
    const { gs, el, mockCB, mockCalls, sleep, Core } = create();
    const at = new Core(el);
    at.use(press);
    at.on(PRESS_NAME, mockCB);

    gs.start();
    await sleep(251);
    gs.end();
    await sleep();
    expect(mockCalls[0][0].type).toBe(PRESS_NAME);
    done();
});

test(`按压的时候移动超过一定"距离", 不触发${PRESS_NAME}`, async done => {
    const { gs, el, mockCB, sleep, Core } = create();
    const at = new Core(el);
    at.use(press);
    at.on(PRESS_NAME, mockCB);

    gs.start();
    gs.move([{ x: 10, y: 10 }]);
    await sleep(251);
    gs.end();
    await sleep();
    expect(mockCB).not.toHaveBeenCalled();
    done();
});

test(`松手的时候还没有构成按压时间要求, 不触发${PRESS_NAME}`, async done => {
    const { gs, el, mockCB, sleep, Core } = create();
    const at = new Core(el);
    at.use(press);
    at.on(PRESS_NAME, mockCB);

    gs.start();
    await sleep(200);
    gs.end();
    await sleep();
    expect(mockCB).not.toHaveBeenCalled();
    done();
});