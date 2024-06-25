import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";
import { User } from "./User";

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

    @Field(() => Int)
    @Property({default: 0})
    points: number

    @Field()
    @ManyToOne(() => User)
    creator!: User


}