import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserFollowingEntity } from './entities/user-followings.entity';

@Module({
  imports: [SequelizeModule.forFeature([User,UserFollowingEntity])
    ,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: { expiresIn: 3600 },
    }),],
  providers: [UserResolver, UserService],
  exports:[UserService]
})
export class UserModule {}
