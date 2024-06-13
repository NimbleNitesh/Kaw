import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constant";
import { Post } from "./entities/Post";
import mikroOrmConfig from "./mikro-orm.config";

const main = async () => {
    // console.log(mikroOrmConfig);
    const orm = await MikroORM.init(mikroOrmConfig);
    await orm.getMigrator().up();
    const em = orm.em.fork()
    // const post = em.create(Post, {title: 'First Post test'} as Post);
    // await em.persist(post).flush();

    const post = await em.find(Post, {});
    console.log(post);

};
console.log('Nitesh Srivastava')
main().catch((err) => {
    console.log(err);
});