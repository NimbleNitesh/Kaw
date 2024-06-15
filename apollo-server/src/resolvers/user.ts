import { User } from "../entities/User";
import { MyContext } from "../types";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import argon2 from "argon2";

@InputType()
class UserCredentials {
  @Field(() => String) username: string;
  @Field(() => String) password: string;
}

@ObjectType()
class FieldError {
  @Field() field: string;
  @Field() message: string;
}

@ObjectType()
class UserResponse {
  // '?' on variable to make it optional. If its value isn't set then it remains 'undefined'
  @Field(() => User, { nullable: true }) user?: User;
  @Field(() => [FieldError], { nullable: true }) error?: [FieldError];
}

@Resolver()
export class UserResolver {


  @Mutation(() => UserResponse)
  async register(
    @Arg("userCredentials") userCredentials: UserCredentials,
    @Ctx() { em }: MyContext
  ): Promise<UserResponse> {
    const hashedPassword = await argon2.hash(userCredentials.password);
    const user = em.create(User, {
      username: userCredentials.username,
      password: hashedPassword,
    } as User);
    try {
      await em.persist(user).flush();
      return { user };
    } catch (err) {
      if (err.code === "23505") {
        return {
          error: [
            {
              field: "username",
              message: "username already exists",
            },
          ],
        };
      }
      return {
        error: [
          {
            field: "unknown",
            message: err.message,
          },
        ],
      };
    }
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("userCredentials") userCredentials: UserCredentials,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(User, { username: userCredentials.username });
    if (!user) {
      return {
        error: [
          {
            field: "username",
            message: "username doesn't exist",
          },
        ],
      };
    }
    
    const valid = await argon2.verify(user.password, userCredentials.password);
    if (!valid) {
      return {
        error: [
          {
            field: "password",
            message: "incorrect password",
          },
        ],
      };
    }

    /**
     * In the Connection settings of studio.apollographql.com turn on use cookies.
     */
    req.session.userId = user.id;

    return {
      user: user,
    };
  }

  @Query( () => User, { nullable: true })
  async me( @Ctx() {em, req}: MyContext ){
    // console.log(req.session.userId);
    if(!req.session.userId)
      return null;
    const user = await em.findOne(User, {id: req.session.userId});
    return user;
  }

}
