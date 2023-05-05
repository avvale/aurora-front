export type QueueJobType = 'completed' | 'waiting' | 'active' | 'delayed' | 'failed'| 'paused';

export interface QueueManagerQueue {
    id: string;
    prefix: string;
    name: string;
    waitingJobs: number;
    activeJobs: number;
    completedJobs: number;
    failedJobs: number;
    delayedJobs: number;
    pausedJobs: number;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface QueueManagerCreateQueue {
    id: string;
    prefix: string;
    name: string;
    waitingJobs: number;
    activeJobs: number;
    completedJobs: number;
    failedJobs: number;
    delayedJobs: number;
    pausedJobs: number;
}

export interface QueueManagerUpdateQueueById {
    id: string;
    prefix?: string;
    name?: string;
    waitingJobs?: number;
    activeJobs?: number;
    completedJobs?: number;
    failedJobs?: number;
    delayedJobs?: number;
    pausedJobs?: number;
}

export interface QueueManagerUpdateQueues {
    id?: string;
    prefix?: string;
    name?: string;
    waitingJobs?: number;
    activeJobs?: number;
    completedJobs?: number;
    failedJobs?: number;
    delayedJobs?: number;
    pausedJobs?: number;
}

export interface QueueManagerJob {
    id: string;
    name: string;
    data: any;
    opts: any;
    progress: number;
    delay: number;
    timestamp: number;
    attemptsMode: number;
    failedReason?: string;
    stacktrace: string[];
    returnvalue?: any;
    finishedOn: number;
    processedOn: number;
}
