import { count } from "console";

export async function register() {
    if (process.env.NEXT_RUNTIME === "nodejs") {
        const { Worker } = await import("bullmq");
        const { connection, jobQueue } = await import('@/lib')

        new Worker("jobQueue", async (job) => { }, {
            connection,
            concurrency: 10,
            removeOnComplete: { count: 1000 },
            removeOnFail: { count: 5000 },
        });
    }
}
