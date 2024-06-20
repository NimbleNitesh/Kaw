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
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from "../constant";
import { sendMail } from "../utils/sendMail";
import { v4 } from "uuid";
import { wrap } from "@mikro-orm/core";

@InputType()
class UserCredentials {
  @Field(() => String) username: string;
  @Field(() => String) password: string;
  @Field(() => String) email?: string;
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
  @Query(() => User, { nullable: true })
  async me(@Ctx() { em, req }: MyContext) {
    // console.log(req.session.userId);
    if (!req.session.userId) return null;
    const user = await em.findOne(User, { id: req.session.userId });
    return user;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("userCredentials") userCredentials: UserCredentials,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const hashedPassword = await argon2.hash(userCredentials.password);
    const user = em.create(User, {
      username: userCredentials.username,
      password: hashedPassword,
      email: userCredentials.email,
    } as User);
    try {
      await em.persist(user).flush();
      req.session.userId = user.id;
      return { user };
    } catch (err) {
      if (err.code == "23505") {
        return {
          error: [
            {
              field: "usernameOrEmail",
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
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(User, {
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });
    if (!user) {
      return {
        error: [
          {
            field: "usernameOrEmail",
            message: "Username/Email doesn't exist",
          },
        ],
      };
    }

    const valid = await argon2.verify(user.password, password);
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

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext): Promise<Boolean> {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }
        res.clearCookie(COOKIE_NAME);
        resolve(true);
      })
    );
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() { em, redisClient }: MyContext
  ) {
    const user = await em.findOne(User, { email: email });
    if (!user) {
      /**
       * We intentionally donot tell the user that this email address doesn't exist as this might be a fishing attempt.
       */
      return true;
    }

    const token = v4();
    await redisClient.set(FORGET_PASSWORD_PREFIX + token, user.id, {
      EX: 300,
    });

    await sendMail(
      email,
      `<p>
      Click the following link to verify your email: 
      <a href="http://localhost:3000/change-password/${token}"> Link </a>.
      Link will be valid for 5 minutes.
      </p>`
    );

    return true;
  }

  @Mutation( ()=> UserResponse)
  async changePassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() {redisClient, em, req}: MyContext
  ): Promise<UserResponse> {
    const key = FORGET_PASSWORD_PREFIX + token;
    const userId = await redisClient.get(key);
    if(!userId){
      return {
        error: [
          {
            field: "token",
            message: "token expired"
          }
        ]
      }
    }

    const user = await em.findOne(User, {id: parseInt(userId)});
    if(!user){
      return {
        error: [
          {
            field: "token",
            message: "user no longer exist"
          }
        ]
      }
    }

    const hashedPassword = await argon2.hash(newPassword);
    user.password = hashedPassword;

    wrap(user).assign({
      password: hashedPassword
    });

    await redisClient.DEL(key);

    req.session.userId = parseInt(userId);

    return { user } ;
  }
}
