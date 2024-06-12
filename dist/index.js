"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@mikro-orm/core");
const Post_1 = require("./entities/Post");
const mikro_orm_config_1 = __importDefault(require("./mikro-orm.config"));
const main = async () => {
    const orm = await core_1.MikroORM.init(mikro_orm_config_1.default);
    await orm.getMigrator().up();
    const post = orm.em.create(Post_1.Post, { title: 'First Post test' });
    orm.em.persist(post);
    await orm.em.flush();
    console.log('-------------sql 2----------------');
    await orm.em.insert(Post_1.Post, { title: "Second Post test" });
};
console.log('Nitesh Srivastava');
main().catch((err) => {
    console.log(err);
});
//# sourceMappingURL=index.js.map
