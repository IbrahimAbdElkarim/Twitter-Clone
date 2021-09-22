import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Tweet } from 'src/tweet/entities/tweet.entity';
import { FollowCreateDto } from './dto/create-follow-user.dto';
import { UserFollowingEntity } from './entities/user-followings.entity';
import { perPage } from 'src/auth/constants';

@Injectable()
export class UserService {
    constructor(@InjectModel(User)
    private userModel: typeof User,
        @InjectModel(UserFollowingEntity)
        private UserFollowingmodel: typeof UserFollowingEntity,
        private jwtService: JwtService,
        ) { }
 
    async createUser(name: string, email: string, password: string): Promise<User> {
        const createdUser= this.userModel.create({ name, email, password });
        if (!createdUser) {
            const error = new Error('Invalid Inputs');
            throw error;
        }
        return 
   }
    async getUserByEmail(email:string): Promise<User>{
        const user = this.userModel.findOne({ where: { email: email } });
        if (!user) {
               const error = new Error('user not found');
                throw error;
            }
        return user
    
    }

    async findAllUsers(page:number): Promise<User[]>{
        const offset = (page - 1) * perPage
        if (offset < 0) {
            const error = new Error('page must be greater than 0');
            throw error;        }
        return this.userModel.findAll({limit:perPage,offset:offset});
        
    }
    async findUserTweets(user: User): Promise<User> {
     
        const tweetcount = await this.userModel.count({ where: { id: user.id }, include: [Tweet] });
        return this.userModel.findOne({ where:{id:user.id},include:[Tweet]});
    }
     async createUserFollowRelation (
        followCreateDto: FollowCreateDto, user:User ) {
        const{followeeId}=followCreateDto
         const followee = await this.userModel.findOne({ where: { id: followeeId } });

        if (!followee ) {
            throw new NotFoundException('User not found id: '+followeeId);
        }
       

         return await this.UserFollowingmodel.create({ followerId: user.id,followeeId: followeeId});
         

     }
    async getuserfolllwers(user: User):Promise<User>{
        const folllwerscount = await this.userModel.count({
            where: { id: user.id }, include: [{
                model: User
                , as: "followers"
            }]
        });

        return this.userModel.findOne({
            where: { id: user.id }, include: [{
                model: User
                , as: "followers"
            }]
        });
        
    }
    async getuserfolllwing(user: User): Promise<User> {
        const folllwingcount = await this.userModel.count({
            where: { id: user.id }
            , include: [{ model: User, as: "follwing" }]
        });
        return this.userModel.findOne({
            where: { id: user.id }
            , include: [{ model: User, as: "follwing" }]
        });
        
    }

}
