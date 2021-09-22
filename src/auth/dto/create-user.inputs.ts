import { Field, InputType } from "@nestjs/graphql";
import { IsString, IsNotEmpty, MinLength, IsEmail } from "class-validator";
@InputType()
export class UserCreateDto{
    @Field()
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string;
    @Field()
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @Field()
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    password: string;
}