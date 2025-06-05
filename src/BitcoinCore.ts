import BitcoinCore from "bitcoin-core";

export interface BitcoinCoreConfig {
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
            port: clientConfig.port || 18443,
            host: clientConfig.host || "localhost"
        }

        this.client = new BitcoinCore(this.clientConfig)
    }

    public async checkConnection(){
        try {
            const blockchainInfo = await this.client.command("getblockchaininfo")
            return blockchainInfo

        } catch (error) {
            console.log("error",error)  
        }

    }
}

