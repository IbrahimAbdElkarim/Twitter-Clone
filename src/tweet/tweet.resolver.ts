import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Console } from 'console';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guards';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { Tweet } from './entities/tweet.entity';
import { TweetService } from './tweet.service';

@Resolver(()=>Tweet)
export class TweetResolver {
    constructor(private readonly tweetService: TweetService) { }
    @UseGuards(GqlAuthGuard)
    @Mutation(() => Tweet)
    createTweet(@CurrentUser() user, @Args('createTweetInputs') createTweetInputs: CreateTweetDto) {
        return this.tweetService.createTweet(createTweetInputs,user);
    }
    @UseGuards(GqlAuthGuard)
    @Query(() => [Tweet])
    findAllTweets(@Args('page') page: number) {
        return this.tweetService.findAllTweets(page);
    }
}
