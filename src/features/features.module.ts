import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SecurityModule } from './security/security.module';

@Module({
  imports: [UserModule, AuthModule, SecurityModule]
})
export class FeaturesModule {}
