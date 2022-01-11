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
