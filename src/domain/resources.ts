export type ResourceTypes = 'peanuts' | 'vehicles';

/** Represents how many resources of each type must be used to advance the task */
export type ResourceUsageReport = { [v in ResourceTypes]?: number };
