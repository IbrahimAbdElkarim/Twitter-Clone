import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { User } from "src/user/entities/user.entity";
import { AuthService } from "../auth.service";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({ usernameField: 'email' })
    }

    validate(email: string, password: string):Promise< User> {
        const user = this.authService.validateUser(email, password)
        if (!user) {
            const error = new Error('user not found');
            throw error;
        }
        return user;
    }
}