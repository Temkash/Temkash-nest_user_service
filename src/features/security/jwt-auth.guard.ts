import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UnauthorizedException } from '@nestjs/common';
import { AccessTokenService } from './access-token/access-token.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private accessTokenService: AccessTokenService) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                throw new UnauthorizedException({ message: 'Пользователь не авторизован' })
            }
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];
            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({ message: 'Пользователь не авторизован' })
            }

            const user = this.accessTokenService.verifyToken(token);
            req.user = user;
            return true;

        } catch (e) {
            throw new UnauthorizedException({ message: 'Пользователь не авторизован' })
        }
    }
}
