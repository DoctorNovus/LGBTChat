import { ForumRoute } from "./forum";
import { ServerRoute } from "./server";

export class Routes {
    constructor(api){
        this.api = api;
        this.routes = {
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