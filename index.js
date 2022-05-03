import WorkerPool from "./worker_pool.js";
import os from "node:os";
import path from "node:path";
import { Worker } from "node:worker_threads";

const pool = new WorkerPool(
    os.cpus().length,
    () => new Worker(new URL("run_query.js", import.meta.url))
);

let finished = 0;
const num = 1000;
for (let i = 0; i < num; i++) {
    pool.runTask(
        { query: "INSERT INTO test(name) values ($1)", values: [i] },
        (err, result) => {
            console.log(i, err, result);
            if (++finished === num) pool.close();
        }
    );
}
