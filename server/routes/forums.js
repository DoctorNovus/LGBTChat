import { Route } from "./route";

export class ForumsRoute extends Route {
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
            messageCount: mCount,
          }));

          res.send(JSON.stringify(doc));
        });
      },
    },
    {
      path: "forums/:id",
      exec: async (req, res, api, user, params) => {
        console.log(params);
      },
    },
    {
      path: "forums/:name/threads",
      exec: async(req, res, api, user, params) => {
        let { name } = params;
        let forum = await api.db.forums.findOne({ name });
        console.log(forum);
        res.send(JSON.stringify(forum.threads));
      }
    }
  ];

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

          let name = body.name;
          let child;

          if (name && body.parent) {
            name = body.parent;
            child = body.name;
          }

          if (name) {
            let ent = await api.db.forums.findOne({ name });
            if (!ent) {
              await api.db.forums.insertOne({ name: body.name, threads: [] });
              res.end({ message: "Forum made" });
            } else {
              if (!child) res.status(400).end({ message: "Forum name taken" });
              else {
                ent.threads.push({ name: child, posts: [] });
                await api.db.forums.updateOne({ name }, { $set: ent });
                res.end({ message: "Thread added" });
              }
            }
          }
        });
      },
    },
  ];
}
