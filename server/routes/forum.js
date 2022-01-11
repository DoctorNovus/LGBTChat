import { Route } from "./route";

export class ForumRoute extends Route {
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
