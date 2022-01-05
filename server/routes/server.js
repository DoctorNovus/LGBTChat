import { Route } from "./route";

export class ServerRoute extends Route {
    get = [
        {
            path: "server/:id",
            exec: async (req, res, api, user, params) => {
                console.log(user);
            }
        }
    ]
}