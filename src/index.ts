import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./contant";
import { Post } from "./entities/Post";
import mikroOrmConfig from "./mikro-orm.config";

const main = async () => {
    // console.log(mikroOrmConfig);
    const orm = await MikroORM.init(mikroOrmConfig);
    await orm.getMigrator().up();
    const post = orm.em.create(Post, {title: 'First Post test'} as Post);
    orm.em.persist(post);
    await orm.em.flush();
    console.log('-------------sql 2----------------');
    await orm.em.insert(Post, {title: "Second Post test"} as Post);

};
console.log('Nitesh Srivastava')
main().catch((err) => {
    console.log(err);
});