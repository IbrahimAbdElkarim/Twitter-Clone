import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

import { jwtSecret } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtSecret
        })
    }

    validate(validationPayload: { payload: { email: string }, iat: string, exp:string }): Promise<User>{
        const user = this.userService.getUserByEmail(validationPayload.payload.email);
        if (!user) {
            const error = new Error('user not found');
            throw error;
        }
        return user;
    }
}