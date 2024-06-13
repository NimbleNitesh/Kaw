import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constant";
// import { Post } from "./entities/Post";
import mikroOrmConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import "reflect-metadata";

const main = async () => {
    const orm = await MikroORM.init(mikroOrmConfig);
    await orm.getMigrator().up();
    const em = orm.em.fork()
    const app = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver],
            validate: false
        }),
        context: () => ({em: em})
    });

    await apolloServer.start();    
    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log("Server started at port 4000");
    });
    // const post = em.create(Post, {title: 'First Post test'} as Post);
    // await em.persist(post).flush();

    // const post = await em.find(Post, {});
    // console.log(post);

};
console.log('Nitesh Srivastava')
main().catch((err) => {
    console.log(err);
});