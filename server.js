'use strict';

var express = require('express');
var next = require('next');
var mongodb = require('mongodb');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var express__default = /*#__PURE__*/_interopDefaultLegacy(express);
var next__default = /*#__PURE__*/_interopDefaultLegacy(next);

class Utils {
    static match(str, rule) {
        var escapeRegex = (str) => str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
        return new RegExp("^" + rule.split("*").map(escapeRegex).join(".*") + "$").test(str);
    }

    static getParameters(str, rule){
        let parameters = {};

        str = str.split(/\//g);
        rule = rule.split(/\//g);
        let newStr = [];

        rule.forEach((ruler, index) => {
            if(ruler.startsWith(":")){
                parameters[ruler.substr(1)] = str[index];
                newStr.push("*");
            } else 
                newStr.push(ruler);
        });

        newStr = newStr.join("/");
        str = str.join("/");

        if(!Utils.match(str, newStr))
            return;

        return parameters;
    }
}

class Route {
    get = [];
    post = [];
    delete = [];

    constructor(api) {
        this.api = api;
    }

    async route(route, user, req, res) {
        let handle = async (item) => {
            let { path, exec } = item;

            let params = Utils.getParameters(route, path);
            if(params)
                await exec(req, res, this.api, user, params);
        };

        // Handles the route based on method
        switch (req.method.trim()) {
            case "GET":
                this.get.forEach(handle);
                break;

            case "POST":
                this.post.forEach(handle);
                break;

            case "DELETE":
                this.delete.forEach(handle);
                break;

            default:
                console.log(`Unknown Method: ${method}`);
                break;
        }
    }

}

class ForumRoute extends Route {
  get = [
    {
      path: "forum/:name",
      exec: async(req, res, api, user, params) => {
        const { name } = params;

        if(!name){
          res.status(404).end("No name was provided.");
          return;
        }

        let forum = await api.db.forums.findOne({ name });
        if(!forum || typeof forum === "undefined"){
          res.status(404).end("Forum not found");
        } else {
          let entity = {
            name: forum.name,
            threads: forum.threads
          };

          res.end(JSON.stringify(entity));
        }
      }
    }
  ];
}

class ForumsRoute extends Route {
  get = [
    {
      path: "forums",
      exec: async (req, res, api, user, params) => {
        await api.db.forums.find({}).toArray((err, doc) => {
          if (!doc || err) {
            res.status(404).end(err);
            return;
          }

          let mCount = 0;
          doc.forEach((doc) => {
            doc.threads.forEach((thread) => {
              if (thread.messages) mCount += thread.messages.length;
            });
          });

          doc = doc.map((doc) => ({
            title: doc.name,
            threadCount: doc.threads.length,
            messageCount: mCount
          }));

          res.send(JSON.stringify(doc));
        });
      },
    },
    {
      path: "forum/:id",
      exec: async(req, res, api, user, params) => {
        console.log(params);
      }
    }
  ];

  // { name: "This is a test thread to see length xD", author: "Hiro" }

  post = [
    {
      path: "forums",
      exec: async (req, res, api, user, params) => {
        let body = "";
        req.on("data", (chunk) => (body += chunk));
        req.on("end", async () => {
          if (body.length > 0)
            try {
              body = JSON.parse(body);
            } catch (err) {
              if (err) console.log(err);
              return;
            }

          if (body.name) {
            let ent = await api.db.forums.findOne({ name: body.name });
            if (!ent) {
              await api.db.forums.insertOne({ name: body.name, threads: [] });
            } else {
              res.status(400).end("Forum name taken");
            }
          }
        });
      },
    },
  ];
}

class Routes {
    constructor(api){
        this.api = api;
        this.routes = {
            "forums": new ForumsRoute(api),
            "forum": new ForumRoute(api)
        };
    }

    async handle(route, token, req, res){
        const primary = route.split("/")[0];
        let user = await this.api.db.users.findOne({ token });
        // if(!user){
        //     res.status(401).end();
        //     return;
        // } else {
            if(!primary){
                res.status(404).end();
                return;
            }

            this.routes[primary].route(route, user, req, res);
        // }
    }
}

class Sockets {
    
}

class API {
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

class Database {
    /**
     * Database constructor
     * @param {Object} config Object that holds the url and name of the DB
     */
    constructor(config) {
        this.url = config.url;
        this.dbName = config.dbName;
    }

    /**
     * Initiates the database
     */
    async init() {
        this.client = new mongodb.MongoClient(this.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        await this.client.connect();
        this.db = await this.client.db(this.dbName);
        this.users = await this.db.collection("users");
        this.forums = await this.db.collection("forums");
    }
}

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next__default["default"]({ dev });
const handle = app.getRequestHandler();
const api = new API();
const config = require("./config.json");
const db = new Database(config);

app.prepare().then(async () => {
    const server = express__default["default"]();
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
