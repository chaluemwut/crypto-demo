export interface ICoin {

    getPriceByAddress(network: string, address: string): Promise<Response>

    getCurrentPrice(): Promise<Response>

}

export const ICoin = Symbol("ICoin");