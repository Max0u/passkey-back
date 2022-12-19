import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthenticatorsModule } from './authenticators/authenticators.module';

@Module({
  imports: [UsersModule, AuthenticatorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
