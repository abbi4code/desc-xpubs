import BitcoinCore from "bitcoin-core";

export interface BitcoinCoreConfig {
    network?: string,
    username?: string,
    password?: string,
    port?: number,
    host?: string
}

export interface walletConfig {
    wallet_name: string,
    disabled_private_keys?: boolean,
    black?: boolean,
    passphrase?: string,
    avoid_reuse?: boolean,
    descriptors: boolean,
    load_on_start?:boolean,
    external_signer?: boolean
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

    public async listWallets(){
        try {
            const walletList = await this.client.command("listwallets")
            return walletList
        } catch (error) {
            console.log('error',error) 
        }
    }

    public async createWallet(walletConfig: walletConfig){
        try {
            const wallet = await this.client.command("createwallet", [walletConfig.wallet_name,walletConfig.disabled_private_keys,walletConfig.black,walletConfig.passphrase,walletConfig.avoid_reuse,walletConfig.descriptors])
            return wallet
            
        } catch (error) {
            console.log("error",error)
            
        }
    }
}

