import { Utils } from "../utils/utils";

export class Route {
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
        }

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