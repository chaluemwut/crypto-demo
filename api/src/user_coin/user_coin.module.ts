import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserCoin } from "./user_coin.entity";
import { UserCoinController } from "./user_coin.controller";
import { UserCoinService } from "./user_coin.service";
import { ICoin } from "src/coin_adapter/icoin";
import { CoingeckoImplementation } from "src/coin_adapter/coingecko_coin";

@Module({
  imports: [TypeOrmModule.forFeature([UserCoin])],
  controllers: [UserCoinController],
  // providers: [UserCoinService]
  providers: [
    {
      provide: ICoin,
      useClass: CoingeckoImplementation
    },
    UserCoinService
  ]
})
export class UserCoinModule { }