import { Collection, Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";
import { Post } from "./Post";

@ObjectType()
@Entity()
export class User {
    @Field(() => Int)
    @PrimaryKey()
    id!: number

    @Field(() => String)
    @Property()
    createdAt = new Date();

    @Field(() => String)
    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();

    @Field()
    @Property({type: 'text', unique: true})
    username!: string;

    @Field()
    @Property({type: 'text', unique: true})
    email!: string;

    // We don't want to access password from GraphQL
    @Property({type: 'text'})
    password!: string;

    @OneToMany(() => Post, post => post.creator)
    posts = new Collection<Post>(this);

}