import { Injectable } from "@nestjs/common";
import { ICoin } from "./icoin";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class CoingeckoImplementation implements ICoin {

  constructor(
    private configService: ConfigService
  ) { }

  getCurrentPrice(): Promise<Response> {
    const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum&vs_currencies=usd';
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'x-cg-demo-api-key': this.configService.get('API_KEY_COINGECKO') }
    };
    return fetch(url, options)
  }

  getPriceByAddress(network: string, address: string): Promise<Response> {
    const url = `https://api.coingecko.com/api/v3/simple/token_price/${network}?contract_addresses=${address}&vs_currencies=usd`;
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'x-cg-demo-api-key': this.configService.get('API_KEY_COINGECKO') }
    };
    return fetch(url, options)
  }

  // getPrice(network: string, address: string): Promise<Response> {
  //   const url = `https://api.coingecko.com/api/v3/simple/token_price/${network}?contract_addresses=${address}&vs_currencies=usd`;
  //   const options = {
  //     method: 'GET',
  //     headers: { accept: 'application/json', 'x-cg-demo-api-key': this.configService.get('API_KEY_COINGECKO') }
  //   };
  //   return fetch(url, options)
  // }

  // get(): Promise<string> {
  //   // ethereum
  //   const url = 'https://api.coingecko.com/api/v3/simple/token_price/id?contract_addresses=0x2260fac5e5542a773aa44fbcfedf7c193bc2c599&vs_currencies=usd';
  //   const options = {
  //     method: 'GET',
  //     headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-P77gZiuaMoWfHFpswzguHQdU' }
  //   };

  //   fetch(url, options)
  //     .then(res => res.json())
  //     .then(json => console.log(json))
  //     .catch(err => console.error('error:' + err));
  //   return Promise.resolve(`Hello World`);
  // }
}