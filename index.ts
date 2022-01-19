import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import { MONGODB, PORT, SECRET } from "./server/utils/config";
import schema from "./server/graphql/schema";
import User from "./server/models/User";
import { UserDocument } from "./server/types";
import createDataLoader, {
  Dataloaders,
} from "./server/utils/createDataLoaders";

import express, { Request } from "express";
import { graphqlUploadExpress } from "graphql-upload";
import { existsSync } from "fs";
import { join } from "path";

mongoose
  .connect(MONGODB || "")
  .then(() => console.log("connected to MongoDB"))
  .catch((err) => console.error(err));
// mongoose.set('debug', true);

export interface Context {
  currentUser?: UserDocument;
  dataLoader: ReturnType<Dataloaders>;
}

async function startServer() {
  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null;
      const dataLoader = createDataLoader();
      if (auth && auth.toLowerCase().startsWith("bearer ")) {
        const { id } = jwt.verify(auth.substring(7), SECRET) as Record<
          string,
          string
        >;
        const currentUser = await User.findById(id);
        return { currentUser, dataLoader };
      }
      return { dataLoader };
    },
  });

  await server.start();
  const app = express();
  app.use(express.static("client/build"));
  app.use(graphqlUploadExpress({ maxFileSize: 5000000, maxFiles: 1 }));
  app.use(express.json());
  app.post("/download", (req: Request<{}, {}, { path: string }>, res) => {
    // console.log(req.body);
    const path = join(process.cwd(), "public", req.body.path);
    if (existsSync(path)) return res.download(path, req.body.path);
    return res.status(400);
  });
  server.applyMiddleware({ app });
  await new Promise<void>((r) => app.listen({ port: PORT || 4000 }, r));
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
}
startServer();
