import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { Payload } from 'src/auth/types';
import { GetCurrentUser } from 'src/common/decorators';
import { AtGuard } from 'src/common/guards';
import { Serialize } from 'src/common/interceptors';
import {
  ChangeEmailDto,
  ChangePasswordDto,
  ChangeUsernameDto,
  PublicUserDto,
} from './dto';
import { UserService } from './user.service';

@Controller('user')
@Serialize(PublicUserDto)
@UseGuards(AtGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  me(@GetCurrentUser() user: Payload) {
    return this.userService.me(user.sub);
  }

  @Patch('change-username')
  changeUsername(
    @GetCurrentUser() user: Payload,
    @Body() dto: ChangeUsernameDto,
  ) {
    return this.userService.changeUsername(user.sub, dto.username);
  }

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
}
