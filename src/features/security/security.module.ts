import { Module } from '@nestjs/common';
import { SecurityService } from './security.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  providers: [SecurityService, JwtAuthGuard],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY || 'secretKey',
      signOptions: { expiresIn: '24h' },
    })
  ],
  exports: [
    JwtModule,
    SecurityService,
    JwtAuthGuard
  ]
})
export class SecurityModule { }
