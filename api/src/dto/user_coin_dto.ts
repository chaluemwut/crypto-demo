export class UserCoinDTO {
    coinName: string
    price: string
    profitLoss: string

    constructor(coinName: string, price: string, profitLoss: string){
        this.coinName = coinName;
        this.price = price;
        this.profitLoss = profitLoss;
    }
}