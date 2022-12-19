import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthenticatorsService } from 'src/authenticators/authenticators.service';

@Module({
  controllers: [UsersController],
  providers: [PrismaService, AuthenticatorsService, UsersService]
})
export class UsersModule {}
