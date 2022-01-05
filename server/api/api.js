import { Routes } from "../routes/index";
import { Sockets } from "../sockets/index";

export class API {
    constructor() {
        if (!API._instance) {
            API._instance = this;
            return this;
        }
    }

    static get instance() {
        return API._instance;
    }

    clients = [];
    routes = new Routes(this);
    sockets = new Sockets(this);

    async setDatabase(){

    }
    
    async init({ db }) {
        this.db = db;
    }

    /**
     * Handles express request with token checking
     * @param {Object} req express request
     * @param {Object} res express response
     */
    async handleRequest(req, res) {
        const route = req.url.split('/api/')[1].trim();
        let token = req.headers.authorization;
        this.routes.handle(route, token, req, res);
    }

    /**
     * Handles the socket with token auth
     * @param {Object} io io definition 
     * @param {Object} socket socket object
     */
    async handleSocket(io, socket) {
        this.io = io;
        await this.sockets.handle(this, io, socket);
    }
}