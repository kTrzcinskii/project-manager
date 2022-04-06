import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { Payload } from 'src/auth/types';
import { GetCurrentUser } from 'src/common/decorators';
import { AtGuard } from 'src/common/guards';
import { Serialize } from 'src/common/interceptors';
import { ChangeUsernameDto, PublicUserDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
@Serialize(PublicUserDto)
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AtGuard)
  @Get('me')
  me(@GetCurrentUser() user: Payload) {
    return this.userService.me(user.sub);
  }

  @UseGuards(AtGuard)
  @Patch('change-username')
  changeUsername(
    @GetCurrentUser() user: Payload,
    @Body() dto: ChangeUsernameDto,
  ) {
    return this.userService.changeUsername(user.sub, dto.username);
  }
}
