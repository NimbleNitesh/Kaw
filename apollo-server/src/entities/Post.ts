import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

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

}