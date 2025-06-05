import BitcoinCore from "bitcoin-core";

interface BitcoinCoreConfig {
    network?: string,
    username?: string,
    password?: string,
    port?: number,
    host?: string
}


export class BitcoinCoreService {
    private client: BitcoinCore
    private clientConfig: BitcoinCoreConfig

    constructor(clientConfig: BitcoinCoreConfig){
        this.clientConfig = {
            network: clientConfig.network || "regtest",
            username: clientConfig.username || "abhishek",
            password: clientConfig.password || "abhishek",
            host: clientConfig.host || "localhost",
            port: clientConfig.port || 18443
        }

        this.client = new BitcoinCore(this.clientConfig)
    }

    
}