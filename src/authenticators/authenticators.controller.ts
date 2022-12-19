import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthenticatorsService } from './authenticators.service';
import { CreateAuthenticatorDto } from './dto/create-authenticator.dto';
import { UpdateAuthenticatorDto } from './dto/update-authenticator.dto';

@Controller('authenticators')
export class AuthenticatorsController {
  constructor(private readonly authenticatorsService: AuthenticatorsService) {}

  @Post()
  create(@Body() createAuthenticatorDto: any) {
    return this.authenticatorsService.createAuthenticator(createAuthenticatorDto);
  }

  // @Get()
  // findAll() {
  //   return this.authenticatorsService.();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authenticatorsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthenticatorDto: UpdateAuthenticatorDto) {
  //   return this.authenticatorsService.update(+id, updateAuthenticatorDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authenticatorsService.remove(+id);
  // }
}
