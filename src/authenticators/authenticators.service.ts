import { Injectable } from '@nestjs/common';
import { Authenticator, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthenticatorsService {
  constructor(private prisma: PrismaService) {}

  async authenticator(
    authenticatorWhereUniqueInput: Prisma.AuthenticatorWhereUniqueInput,
  ): Promise<Authenticator | null> {
    return this.prisma.authenticator.findUnique({
      where: authenticatorWhereUniqueInput,
    });
  }

  async authenticators(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AuthenticatorWhereUniqueInput;
    where?: Prisma.AuthenticatorWhereInput;
    orderBy?: Prisma.AuthenticatorOrderByWithRelationInput;
  }): Promise<Authenticator[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.authenticator.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createAuthenticator(data: Prisma.AuthenticatorCreateInput): Promise<Authenticator> {
    return this.prisma.authenticator.create({
      data,
    });
  }

  async updateAuthenticator(params: {
    where: Prisma.AuthenticatorWhereUniqueInput;
    data: Prisma.AuthenticatorUpdateInput;
  }): Promise<Authenticator> {
    const { data, where } = params;
    return this.prisma.authenticator.update({
      data,
      where,
    });
  }

  async deleteAuthenticator(where: Prisma.AuthenticatorWhereUniqueInput): Promise<Authenticator> {
    return this.prisma.authenticator.delete({
      where,
    });
  }
}