import { Body, Controller, Get, Post, UseGuards, Request, Inject } from "@nestjs/common";
import { UserCoinService } from "./user_coin.service";
import { AuthGuard } from "src/auth/auth.guard";
import { ICoin } from "src/coin_adapter/icoin";

@Controller('user-coin')
export class UserCoinController {
    constructor(
        private userCoinService: UserCoinService,
        @Inject(ICoin) private readonly iCoin: ICoin
    ) { }

    @UseGuards(AuthGuard)
    @Get('list')
    list(@Request() req) {
        const str = this.iCoin.get();
        console.log('str', str)
        return this.userCoinService.listByUserId(req.user.userId);
    }
}