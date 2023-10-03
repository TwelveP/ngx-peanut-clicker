
export interface Task {
    taskId: number;
    description: string;
    callback: () => any;
    timeCreated: number;
    duration: number;
    state: 'active' | 'paused' | 'finished' | 'cancelled';
    timeFinished?: number;
}
