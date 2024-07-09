import { Post } from "../entities/Post";
import {
  Arg,
  Ctx,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
  Field,
  ObjectType,
} from "type-graphql";
import { MyContext } from "../types";
import { User } from "../entities/User";
import { isAuth } from "../middleware/isAuth";
import { EntityManager } from "@mikro-orm/postgresql";

@InputType()
class PostCursor {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  createdAt: string;
}

@ObjectType()
class PaginatedPost {
  @Field(() => [Post])
  posts: Post[];

  @Field()
  hasMore: boolean;
}

@Resolver()
export class PostResolver {
  @Query(() => PaginatedPost)
  async getAllPosts(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => PostCursor, { nullable: true })
    cursor: PostCursor | null,
    @Ctx() { em }: MyContext
  ) {
    const realLimit = Math.min(50, limit) + 1;

    const emm = em as EntityManager;
    const qb = emm.createQueryBuilder(Post, 'p');

    if (cursor === null) {
      const res = await qb
        .select("*")
        .leftJoinAndSelect("p.creator", 'u')  // MikroORM automatically joins on the correct condition
        .where({ "p.createdAt": { $lt: new Date() } }) // $lt = less than
        .orderBy({ "p.createdAt": "DESC", "p.id": "ASC" })
        .limit(realLimit);

      const hasMore = res.length === realLimit;
      return { posts: res.slice(0, realLimit - 1), hasMore }; // User asked for 10, we fetched 11(to know about hasMore) but we will show 10 only
    } else {
      const res = await qb
        .select("*")
        .leftJoinAndSelect("p.creator", 'u')
        .where({
          $or: [
            { "p.createdAt": { $lt: new Date(parseInt(cursor.createdAt)) } },
            {
              $and: [
                { "p.createdAt": { $eq: new Date(parseInt(cursor.createdAt)) } },
                { "p.id": { $gt: cursor.id } },
              ],
            },
          ],
        })
        .orderBy({ "p.createdAt": "DESC", "p.id": "ASC" })
        .limit(realLimit);
      const hasMore = res.length === realLimit;
      return { posts: res.slice(0, realLimit - 1), hasMore };
    }
  }

  @Query(() => Post, { nullable: true })
  getPost(
    @Arg("id", () => Int) id: number,
    @Ctx() { em }: MyContext
  ): Promise<Post | null> {
    return em.findOne(Post, { id });
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg("title", () => String) title: string,
    @Ctx() { em, req }: MyContext
  ): Promise<Post> {
    const userId = req.session.userId;
    // Load the user from the database
    const user = await em.findOne(User, { id: userId });
    if (!user) {
      throw new Error("User not found");
    }
    const post = em.create(Post, { title: title, creator: user } as Post);
    await em.persist(post).flush();
    return post;
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg("id", () => Int) id: number,
    @Arg("title", () => String, { nullable: true }) title: string,
    @Ctx() { em }: MyContext
  ): Promise<Post | null> {
    const post = await em.findOne(Post, { id });
    if (!post) return null;
    if (typeof title !== "undefined") {
      post.title = title;
      await em.persist(post).flush();
    }
    return post;
  }

  @Mutation(() => Boolean)
  async deletePost(
    @Arg("id", () => Int) id: number,
    @Ctx() { em }: MyContext
  ): Promise<boolean> {
    try {
      await em.nativeDelete(Post, { id });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
