import { Module } from '@nestjs/common';
import { AccessTokenService } from './access-token.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [AccessTokenService],
  imports: [
      JwtModule.register({
        secret: process.env.JWT_SECRET_KEY || 'secretKey',
        signOptions: { expiresIn: '24h' },
      }),
  ],
  exports: [
    JwtModule,
    AccessTokenService
  ]
})
export class AccessTokenModule {}
