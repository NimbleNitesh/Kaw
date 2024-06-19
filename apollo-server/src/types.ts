import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";
import { Request, Response } from "express";
import redis, { RedisClientType } from 'redis';

export type MyContext = {
    em: EntityManager<IDatabaseDriver<Connection>>;
    req: Request;
    res: Response;
    redisClient: RedisClientType<redis.RedisModules, redis.RedisFunctions, redis.RedisScripts>;
}