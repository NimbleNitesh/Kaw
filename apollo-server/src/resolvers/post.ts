import { Post } from "../entities/Post";
import { Arg, Ctx, Int, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { MyContext } from "../types";
import { User } from "../entities/User";
import { isAuth } from "../middleware/isAuth";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  getAllPosts(@Ctx() { em }: MyContext) {
    return em.find(Post, {});
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
