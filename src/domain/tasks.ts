import { PeanutProduct } from "./peanuts";
import { ProductMarketabilityReport } from "./finance";
import { ResourceUsageReport } from "./resources";

export type TaskStates = 'queued' | 'active' | 'paused' | 'finished' | 'cancelled';
export type TaskTypes = 'buy' | 'sell';

export interface TaskDraft {
    type: TaskTypes;
    timeCreated: number;
    plan: TaskPlan;
    product?: PeanutProduct;
}

export interface Task extends TaskDraft {
    state: TaskStates;
    taskId: number;
    duration: number;
    cost: number;
    description: string;
    timeFinished?: number;
}

export interface TaskPlan {
    marketability: ProductMarketabilityReport;
    resourceUsage: ResourceUsageReport;
}
