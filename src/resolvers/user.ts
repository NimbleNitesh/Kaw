import { User } from "../entities/User";
import { MyContext } from "../types";
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";
import argon2 from "argon2";

@InputType()
class UserCredentials {
  @Field(() => String) username: string;
  @Field(() => String) password: string;
}

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async register(
    @Arg("userCredentials") userCredentials: UserCredentials,
    @Ctx() { em }: MyContext
  ) {
    const hashedPassword = await argon2.hash(userCredentials.password);
    const user = em.create(User, {
      username: userCredentials.username,
      password: hashedPassword,
    } as User);
    await em.persist(user).flush();
    return user;
  }
}
