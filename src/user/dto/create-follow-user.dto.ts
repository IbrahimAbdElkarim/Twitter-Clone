import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber } from "class-validator";

@InputType()
export class FollowCreateDto {

    @Field()
    @IsNumber()
    @IsNotEmpty()
    followeeId: number;
}