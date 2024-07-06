import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";
import { User } from "./User";

type Reactions = {
    funny: number;
    love: number;
    sad: number;
    support: number;
    idea: number;
};

@ObjectType()
@Entity()
export class Post {
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
    @Property({type: 'text'})
    title!: string;

    // Object of reaction types: {"funny": 0, "love": 0, "sad": 0, "support": 0, "idea": 0}
    @Field(() => String)
    @Property({ type: 'jsonb',  default: JSON.stringify({funny: 0, love: 0, sad: 0, support: 0, idea: 0})})
    reactions: Reactions;

    @Field()
    @ManyToOne(() => User)
    creator!: User


}