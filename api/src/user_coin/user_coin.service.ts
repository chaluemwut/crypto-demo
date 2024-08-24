import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserCoin } from "src/typeorm/user_coin.entity";
import { ICoin } from "src/coin_adapter/icoin";
import { UserCoinDTO } from "src/dto/user_coin_dto";

@Injectable()
export class UserCoinService {
    constructor(
        @Inject(ICoin) private readonly iCoin: ICoin,
        @InjectRepository(UserCoin) private userCoinRepository: Repository<UserCoin>
    ) { }

    async listByUserId(userId: number): Promise<UserCoinDTO[]> {
        const res: UserCoin[] = await this.userCoinRepository.find({ where: { user_id: userId } });
        const ret: UserCoinDTO[] = [];
        let currentPrice: number = await this.#getCurrent();
        res.map( async (e) => {
            let profitLoss = ((e.price - currentPrice)*100/(e.price)).toFixed(2);
            ret.push(new UserCoinDTO(e.network, e.price.toString(), profitLoss+''))
        })
        return ret;
    }

    async save(userId: number, network: string, address: string) {
        let userCoin = new UserCoin();
        userCoin.user_id = userId;
        userCoin.network = network;
        userCoin.address = address;
        userCoin.price = await this.#getPriceByAddress(network, address);
        this.userCoinRepository.save(userCoin);
    }

    async #getPriceByAddress(network: string, address: string): Promise<number> {
        const resPrice = await this.iCoin.getPriceByAddress(network, address);
        const jsonPrice = await resPrice.json();
        return Number(jsonPrice[address]['usd']);
    }

    async #getCurrent(): Promise<number> {
        const resPrice = await this.iCoin.getCurrentPrice();
        const jsonPrice = await resPrice.json();
        return Number(jsonPrice['bitcoin']['usd']);
    }

}