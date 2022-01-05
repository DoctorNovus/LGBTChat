import express from "express";
import next from "next";
import { API } from "./api/api";
import { Database } from "./database/database";

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const api = new API();
const config = require("./config.json");
const db = new Database(config);

app.prepare().then(async () => {
    const server = express();
    await db.init();
    await api.init({ db });

    server.all("/api/*", async (req, res) => {
        return api.handleRequest(req, res);
    });

    server.all("*", (req, res) => {
        return handle(req, res);
    });

    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});