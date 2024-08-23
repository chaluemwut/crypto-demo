import { Injectable } from "@nestjs/common";
import { ICoin } from "./icoin";

@Injectable()
export class CoingeckoImplementation implements ICoin { // Used as an interface
  get(): Promise<string> {
    return Promise.resolve(`Hello World`);
  }
}