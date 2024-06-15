import { __prod__ } from "./constant";
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
    entities: ['dist/entities/**/*.js'],
    entitiesTs: ['src/entities/**/*.ts'],
    debug: !__prod__,
    extensions: [Migrator],
    host: 'localhost',
    port: 5432
}) as Parameters<typeof MikroORM.init>[0];