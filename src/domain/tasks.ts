import { Observable } from "rxjs";
import { PeanutProduct } from "./peanuts";

export type TaskStates = 'queued' | 'active' | 'paused' | 'finished' | 'cancelled';
export type TaskTypes = 'buy' | 'sell';

export interface Task {
    type: TaskTypes;
    duration: number;
    cost?: number;
    description?: string;
    advanceCallback: Observable<void | never>;
    doneCallback: Observable<void | never>;
    taskId?: number;
    state?: TaskStates;
    product?: PeanutProduct;
    timeCreated?: number;
    timeFinished?: number;
}
