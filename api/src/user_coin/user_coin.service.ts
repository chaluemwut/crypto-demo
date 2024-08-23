import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserCoin } from "src/typeorm/user_coin.entity";

@Injectable()
export class UserCoinService {
    constructor(
        @InjectRepository(UserCoin) private userCoinRepository: Repository<UserCoin>
    ) { }

    async listByUserId(userId: number): Promise<UserCoin[]> {
        return this.userCoinRepository.find({ where: { user_id: 9 } })
    }
}