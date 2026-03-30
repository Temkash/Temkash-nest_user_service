import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SecurityService {

    constructor(
        private jwtService: JwtService
    ) { }

    async generateToken(user) {
        const payload = { email: user.email, id: user.id, roles: user.roles };
        return {
            token: this.jwtService.sign(payload)
        }
    }

}
