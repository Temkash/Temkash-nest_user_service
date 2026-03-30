import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { userRepositoryProvider } from './user-repository.provider';
import { SecurityModule } from '../security/security.module';

@Module({
  controllers: [UserController],
  providers: [UserService, userRepositoryProvider],
  imports: [
    SecurityModule
  ],
  exports: [
    UserModule,
    UserService,
  ]
})
export class UserModule {}
