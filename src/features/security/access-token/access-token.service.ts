import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AccessTokenService {
    constructor(
        private jwtService: JwtService
    ) { }

    async generateToken(user) {
        const payload = { email: user.email, id: user.id};
        return this.jwtService.sign(payload)
    }

}
