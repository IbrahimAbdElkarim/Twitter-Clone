import { Field, ObjectType } from "@nestjs/graphql";
import { AllowNull, AutoIncrement, BelongsTo, BelongsToMany, Column, ForeignKey, HasMany, IsNull, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "./user.entity";

@ObjectType()
@Table
export class UserFollowingEntity extends Model{
    @Field()
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;
  
  @Field()
  @ForeignKey(() => User )
  @Column
  followerId: number;
  
  @Field()
  @ForeignKey(() => User)
  @Column
  followeeId: number;
  
  

    
 
   
 }