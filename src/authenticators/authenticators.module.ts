import { Module } from '@nestjs/common';
import { AuthenticatorsService } from './authenticators.service';
import { AuthenticatorsController } from './authenticators.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AuthenticatorsController],
  providers: [PrismaService, AuthenticatorsService]
})
export class AuthenticatorsModule {}
