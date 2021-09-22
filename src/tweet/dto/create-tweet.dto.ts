import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

@InputType()
export class CreateTweetDto {

    @Field()
    @IsString()
    @IsNotEmpty()
    @MaxLength(240)
    content: string;
    

}
