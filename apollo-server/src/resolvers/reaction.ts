import {
  Mutation,
  Resolver,
  Arg,
  Ctx,
  UseMiddleware,
  Int,
  Query,
} from "type-graphql";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";
import { Post } from "../entities/Post";
import { User } from "../entities/User";
import { Reaction } from "../entities/Reaction";
import { wrap } from "@mikro-orm/core";
import { EntityManager } from "@mikro-orm/postgresql";

@Resolver()
export class ReactionResolver {
  @Mutation()
  @UseMiddleware(isAuth)
  async createReaction(
    @Arg("postId", () => Int) postId: number,
    @Arg("reaction", () => String) reaction: string,
    @Ctx() { em, req }: MyContext
  ) {
    const post = await em.findOne(Post, { id: postId });
    if (!post) {
      throw new Error("Post not found");
    }
    const user = await em.findOne(User, { id: req.session.userId });
    if (!user) {
      throw new Error("User not found");
    }

    const reactionObj = await em.findOne(Reaction, { post, user });
    if (reactionObj) {
      wrap(reactionObj).assign({ reaction });
    } else {
      const newReaction = em.create(Reaction, {
        post: post,
        user: user,
        reaction: reaction,
      } as Reaction);
      await em.persist(newReaction).flush();
    }
  }

  @Query(() => [Reaction])
  @UseMiddleware(isAuth)
  async getReactions(
    @Arg("userId", () => Int) userId: number,
    @Ctx() { em }: MyContext
  ) {
    const emm = em as EntityManager;
    const qb = emm.createQueryBuilder(Reaction, "r");
    const res = await qb
      .select("*")
      .where({ "r.userId": userId })
      .orderBy({ "r.updatedAt": "DESC" })
      .limit(10);
    return res;
  }
}
