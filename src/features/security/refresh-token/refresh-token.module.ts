import { Module } from '@nestjs/common';
import { RefreshTokenService } from './refresh-token.service';
import { JwtModule } from '@nestjs/jwt';
import { refreshTokenRepositoryProvider } from './refresh-token-repository.provider';

@Module({
  providers: [RefreshTokenService, refreshTokenRepositoryProvider],
  imports: [
        JwtModule.register({
          secret: process.env.JWT_REFRESH_SECRET_KEY || 'secretRefreshKey',
          signOptions: { expiresIn: '30d' },
        }),
    ],
  exports: [
    JwtModule,
    RefreshTokenService
  ]
})
export class RefreshTokenModule {}
