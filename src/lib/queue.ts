import { Queue } from "bullmq";
import { connection } from "."

export const jobQueue = new Queue("jobQueue", {
    connection,
    defaultJobOptions: {
        attempts: 2,
        backoff: {
            type: "exponential",
            delay: 5000,
        }
    }
})
