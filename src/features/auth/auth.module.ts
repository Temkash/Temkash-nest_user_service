import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { SecurityModule } from '../security/security.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UserModule,
    SecurityModule
  ],
  exports: [
    AuthService,
  ]
})
export class AuthModule {}
