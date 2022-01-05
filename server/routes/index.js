import { ServerRoute } from "./server";

export class Routes {
    constructor(api){
        this.api = api;
        this.routes = {
            "server": new ServerRoute(api)
        };
    }

    async handle(route, token, req, res){
        let user = await this.api.db.users.findOne({ token });
        if(!user){
            res.status(401).end();
            return;
        } else {
            if(!primary){
                res.status(404).end();
                return;
            }

            this.routes[primary].route(route, user, req, res);
        }
    }
}