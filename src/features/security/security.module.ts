import { Module } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import { AccessTokenModule } from './access-token/access-token.module';

@Module({
  providers: [JwtAuthGuard],
  imports: [
    RefreshTokenModule,
    AccessTokenModule
  ],
  exports: [
    JwtAuthGuard,
    AccessTokenModule,
    RefreshTokenModule
  ]
})
export class SecurityModule { }
