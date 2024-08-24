import { Body, Controller, Get, Post, UseGuards, Request, Inject } from "@nestjs/common";
import { UserCoinService } from "./user_coin.service";
import { AuthGuard } from "src/auth/auth.guard";

@Controller('user-coin')
export class UserCoinController {
    constructor(
        private userCoinService: UserCoinService
    ) { }

    @UseGuards(AuthGuard)
    @Get('list')
    list(@Request() req) {
        return this.userCoinService.listByUserId(req.user.userId);
    }


    @UseGuards(AuthGuard)
    @Post('save')
    userSaveCoin(@Request() req, @Body() body) {
        return this.userCoinService.save(req.user.userId, body.network, body.address)
    }
}