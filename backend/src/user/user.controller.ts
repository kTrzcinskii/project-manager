import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { Payload } from 'src/auth/types';
import { GetCurrentUser } from 'src/common/decorators';
import { AtGuard } from 'src/common/guards';
import { Serialize } from 'src/common/interceptors';
import {
  ChangeEmailDto,
  ChangePasswordDto,
  ChangeUsernameDto,
  DeleteAccountDto,
  PublicUserDto,
} from './dto';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(AtGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Serialize(PublicUserDto)
  @Get('me')
  me(@GetCurrentUser() user: Payload) {
    return this.userService.me(user.sub);
  }

  @Serialize(PublicUserDto)
  @Patch('change-username')
  changeUsername(
    @GetCurrentUser() user: Payload,
    @Body() dto: ChangeUsernameDto,
  ) {
    return this.userService.changeUsername(user.sub, dto.username);
  }

  @Serialize(PublicUserDto)
  @Patch('change-email')
  changeEmail(@GetCurrentUser() user: Payload, @Body() dto: ChangeEmailDto) {
    return this.userService.changeEmail(user.sub, dto.email);
  }

  @Patch('change-password')
  changePassword(
    @GetCurrentUser() user: Payload,
    @Body() dto: ChangePasswordDto,
  ) {
    return this.userService.changePassword(user.sub, dto.password);
  }

  @Delete('delete-account')
  async deleteAccount(
    @GetCurrentUser() user: Payload,
    @Body() dto: DeleteAccountDto,
    @Res() response: Response,
  ) {
    const successful = await this.userService.deleteAccount(user.sub, dto);
    return response.json(successful);
  }
}
