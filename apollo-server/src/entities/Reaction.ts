import { Entity, ManyToOne, PrimaryKeyProp, Property } from "@mikro-orm/core";
import { Post } from "./Post";
import { User } from "./User";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Reaction {
    @Field(() => Post)
    @ManyToOne( {primary: true} )
    post: Post;

    @Field(() => User)
    @ManyToOne( {primary: true} )
    user: User;

    @Field(() => String, { nullable: true })
    @Property()
    reaction: string;

    @Field(() => String)
    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();

    [PrimaryKeyProp]? : ['post', 'user'];// this is needed for proper type checks in `FilterQuery`
}