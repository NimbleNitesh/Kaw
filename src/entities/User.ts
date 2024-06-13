import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

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

    // We don't want to access password from GraphQL
    @Property({type: 'text'})
    password!: string;

}