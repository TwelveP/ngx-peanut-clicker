import { PeanutProduct } from "./peanuts";

export type TaskStates = 'queued' | 'active' | 'paused' | 'finished' | 'cancelled';

export interface Task {
    type: 'buy' | 'sell' | '',
    duration: number;
    description?: string;
    callback?: () => any;
    taskId?: number;
    state?: TaskStates;
    product?: PeanutProduct;
    timeCreated?: number;
    timeFinished?: number;
}
