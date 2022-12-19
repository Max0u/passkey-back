import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, HttpException, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Authenticator, User } from '@prisma/client';
import { AuthenticatorsService } from 'src/authenticators/authenticators.service';
import { generateRegistrationOptions, verifyRegistrationResponse }  from '@simplewebauthn/server';


// Human-readable title for your website
const rpName = 'SimpleWebAuthn Example';
// A unique identifier for your website
const rpID = 'localhost';
// The URL at which registrations and authentications should occur
const origin = `http://${rpID}:3000`;


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly authService: AuthenticatorsService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get('getRegistration/:id')
  async get_registration(@Param('id') id: string) {
    const user: User = await this.usersService.user({ id: id })
    // (Pseudocode) Retrieve any of the user's previously-
    // registered authenticators
    const userAuthenticators: Authenticator[] = await this.authService.authenticators({
      where: {
        user: user
      }
    })

    const options = generateRegistrationOptions({
      rpName,
      rpID,
      userID: user.id,
      userName: user.name,
      // Don't prompt users for additional information about the authenticator
      // (Recommended for smoother UX)
      attestationType: 'none',
      // Prevent users from re-registering existing authenticators
      excludeCredentials: userAuthenticators.map(authenticator => ({
        id: authenticator.credentialId,
        type: 'public-key',
      })),
    });

    this.usersService.updateUser({ where: { id: id }, data: { currentChallenger: options.challenge } })

    return options;
  }

  @Post("registrationVerification")
  async registration_verification(@Body() body: any) {
    const id: string = "6d0a8942-5550-4ac3-81a5-41d2b94957d9"

    // (Pseudocode) Retrieve the logged-in user
    const user: User = await this.usersService.user({ id: id })
    // (Pseudocode) Get `options.challenge` that was saved above
    const expectedChallenge: string = user.currentChallenger

    let verification;
    try {
      verification = await verifyRegistrationResponse({
        credential: body,
        expectedChallenge,
        expectedOrigin: origin,
        expectedRPID: rpID,
      });
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Something bad happened', { cause: new Error(), description: error })
    }

    const { verified } = verification;


    const { registrationInfo } = verification;
    const { credentialPublicKey, credentialID, counter } = registrationInfo;

    const newAuthenticator = {
      credentialId: credentialID,
      credentialPublicKey,
      counter,
      user: { connect: { id: id } },
    };
    this.authService.createAuthenticator(newAuthenticator)

    return verified
  }

  // @Get()
  // findAll() {
  //   return this.usersService.users();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser({
      where: { id: id },
      data: updateUserDto
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.deleteUser({ id: id });
  }
}
