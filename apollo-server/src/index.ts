import { MikroORM } from "@mikro-orm/core";
import { COOKIE_NAME, __prod__ } from "./constant";
// import { Post } from "./entities/Post";
import mikroOrmConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import "reflect-metadata";
import { UserResolver } from "./resolvers/user";
import RedisStore from "connect-redis";
import session from "express-session";
import { createClient } from "redis";
import cors from "cors";
declare module "express-session" {
    interface SessionData {
        userId: number;
    }
  }

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up();
  const em = orm.em.fork();
  const app = express();

  // Initialize client.
  let redisClient = createClient();
  redisClient.connect().catch(console.error);

  // Initialize store.
  let redisStore = new RedisStore({
    client: redisClient,
    prefix: "myapp:",
    disableTouch: true
  });

  app.use(
    cors({
      origin: ['https://studio.apollographql.com', 'http://localhost:3000'], // Allow your client URL
      credentials: true, // Allow credentials
    })
  )

  // Initialize session storage.
  app.use(
    session({
      name: COOKIE_NAME,
      store: redisStore,
      resave: false, // required: force lightweight session keep alive (touch)
      saveUninitialized: false, // recommended: only save session when data exists
      secret: "fhewufbhwoehuifcnciuhdfoq",
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax",
        secure: __prod__
      }
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({req, res}) => ({ em: em, req, res }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ 
    app,
    cors: false
});

  app.listen(4000, () => {
    console.log("Server started at port 4000");
  });
  // const post = em.create(Post, {title: 'First Post test'} as Post);
  // await em.persist(post).flush();

  // const post = await em.find(Post, {});
  // console.log(post);
};
console.log("Nitesh Srivastava");
main().catch((err) => {
  console.log(err);
});
