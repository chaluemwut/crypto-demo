export interface ICoin {
    get(): Promise<string>  
}

export const ICoin = Symbol("ICoin");