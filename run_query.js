import { parentPort } from "node:worker_threads";
import pg from "pg";
const { Client } = pg;
parentPort.on("message", async ({ query, values }) => {
    const client = new Client({
        user: "postgres",
        database: "postgres",
        password: "mysecretpassword",
        host: "localhost",
        port: 5432,
    });
    await client.connect();
    await client.query(query, values);
    await client.end();
    parentPort.postMessage(values[0]);
});
