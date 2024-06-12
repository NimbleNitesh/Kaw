import { Post } from "./entities/Post";
import { __prod__ } from "./contant";
import { MikroORM, defineConfig } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { Migrator } from "@mikro-orm/migrations";
import path from "path";

export default defineConfig({
    migrations: {
        path: path.join(__dirname, "./migrations"),
        glob: '!(*.d).{js,ts}',
    },
    dbName: 'Kaw',
    driver: PostgreSqlDriver,
    user: 'horridbear',
    password: 'password',
    entities: [Post],
    debug: !__prod__,
    extensions: [Migrator],
    host: 'localhost',
    port: 5432
}) as Parameters<typeof MikroORM.init>[0];