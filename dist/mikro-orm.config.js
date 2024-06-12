"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Post_1 = require("./entities/Post");
const contant_1 = require("./contant");
const core_1 = require("@mikro-orm/core");
const postgresql_1 = require("@mikro-orm/postgresql");
const migrations_1 = require("@mikro-orm/migrations");
const path_1 = __importDefault(require("path"));
exports.default = (0, core_1.defineConfig)({
    migrations: {
        path: path_1.default.join(__dirname, "./migrations"),
        glob: '!(*.d).{js,ts}',
    },
    dbName: 'Kaw',
    driver: postgresql_1.PostgreSqlDriver,
    user: 'horridbear',
    password: 'password',
    entities: [Post_1.Post],
    debug: !contant_1.__prod__,
    extensions: [migrations_1.Migrator],
    host: 'localhost',
    port: 5432
});
//# sourceMappingURL=mikro-orm.config.js.map