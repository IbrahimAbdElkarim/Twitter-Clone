import { Field, ObjectType } from "@nestjs/graphql";
import { Exclude } from "class-transformer";
import { AutoIncrement, BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "src/user/entities/user.entity";

@ObjectType()
@Table
export class Tweet extends Model{
    @Field()
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Field()
    @Column
    content: string;
    @Field()
    @Column
    createdAt: Date;
    @Field()
    @Column
    updatedAt: Date;
    
    @Field()
    @ForeignKey(() => User)
    @Column
    userId: number;
    @BelongsTo(() => User)
    @Exclude({ toPlainOnly: true })
    @Field(() => User)
    user: number;

    
}
