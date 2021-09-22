import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FollowCreateDto } from './dto/create-follow-user.dto';
import { UserFollowingEntity } from './entities/user-followings.entity';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guards';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/current-user.decorator';

@Resolver(()=> User)
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Query(() => [User])
  @UseGuards(GqlAuthGuard)
  findAllUsers(@CurrentUser() user,@Args('page')page:number) {
    return this.userService.findAllUsers(page);
  }
  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  findUserTweets(@CurrentUser() user){
    return this.userService.findUserTweets(user);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => UserFollowingEntity)
  followUser(@CurrentUser() user, @Args('followCreateDto') followCreateDto: FollowCreateDto) {
    return this.userService.createUserFollowRelation(followCreateDto,user);
  }
  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  getuserfolllwers(@CurrentUser() user) {
    return this.userService.getuserfolllwers(user);
  }
  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  getuserfolllwing(@CurrentUser() user) {
    return this.userService.getuserfolllwing(user);
  }
}
