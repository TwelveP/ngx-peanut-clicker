export type ClockStates = 'stopped' | 'running' | 'paused' | 'resumed' | 'other';

export const CLOCK_PAUSE_TOGGLING_STATES: { [key in ClockStates]: ClockStates } = {
    stopped: 'running',
    running: 'paused',
    paused:  'resumed',
    resumed: 'paused',
    other:   'paused'
};
