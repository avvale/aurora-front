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
