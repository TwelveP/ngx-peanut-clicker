import { PeanutProduct } from "./peanuts";
import { ProductMarketabilityReport } from "./finance";
import { ResourceUsageReport } from "./resources";

export type TaskStates = 'queued' | 'active' | 'paused' | 'finished' | 'cancelled';
export type TaskTypes = 'buy' | 'sell';

export interface TaskDraft {
    type: TaskTypes;
    state: TaskStates;
    timeCreated: number;
    plan: TaskPlan;
}

export interface Task extends TaskDraft {
    taskId: number;
    duration: number;
    cost: number;
    description: string;
    product?: PeanutProduct;
    timeFinished?: number;
}

export interface TaskPlan {
    type: TaskTypes;
    marketability: ProductMarketabilityReport;
    resourceUsage: ResourceUsageReport;
}
