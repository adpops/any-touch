import { RECOGNIZER_STATE, Computed } from '@any-touch/shared';
import {
    STATE_POSSIBLE,
    STATE_START,
    STATE_MOVE,
    STATE_END,
    STATE_CANCELLED,
    STATE_FAILED,
    TYPE_END, flow, getStatusName,createPluginContext
} from '@any-touch/shared';
import { ComputeDistance, ComputeDeltaXY, ComputeVAndDir } from '@any-touch/compute';
import Core from '@any-touch/core';

const DEFAULT_OPTIONS = { name: 'pan', threshold: 10, pointLength: 1 };
/**
 * "拖拽"识别器
 * @param at AnyTouch实例
 * @param options 识别器选项
 * @returns  
 */
export default function (at: Core, options?: Partial<typeof DEFAULT_OPTIONS>) {
    const _options = { ...options, ...DEFAULT_OPTIONS };
    const { name } = _options;
    const context = createPluginContext(name);

    at.on('computed', (computed) => {
        // 重置status
        if ([STATE_END, STATE_CANCELLED, STATE_FAILED].includes(context.state)) {
            context.state = STATE_POSSIBLE;
        }

        // 禁止
        if(context.disabled) {
            context.state = STATE_POSSIBLE;
            return;
        };
        const isValid = test(computed, _options, context.state);
        context.state = flow(isValid, context.state, computed.phase);

        if (isValid) {
            at.emit2(name, computed);
            at.emit2(name + getStatusName(context.state), computed);
        }
    });

    // 加载计算方法
    at.compute([ComputeVAndDir, ComputeDistance, ComputeDeltaXY]);
    return context;
}

function test(computed: Computed, options: typeof DEFAULT_OPTIONS, state: RECOGNIZER_STATE) {
    let isRecognized = ([STATE_START, STATE_MOVE] as Array<string | number>).includes(state);
    const { pointLength, distance, direction, phase } = computed;
    return (
        ((isRecognized || (distance && options.threshold <= distance)) &&
            options.pointLength === pointLength &&
            void 0 !== direction) ||
        (isRecognized && TYPE_END === phase)
    );
}