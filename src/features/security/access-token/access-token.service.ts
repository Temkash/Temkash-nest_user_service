import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/features/user/user.model';

@Injectable()
export class AccessTokenService {
    constructor(
        private jwtService: JwtService
    ) { }

    async generateToken(user: User) {
        const payload = { email: user.email, id: user.id};
        return this.jwtService.sign(payload)
    }

    verifyToken(token: string) {
        return this.jwtService.verify(token);
    }

}
