import BitcoinCore from "bitcoin-core";

export interface BitcoinCoreConfig {
    network?: string,
    username?: string,
    password?: string,
    port?: number,
    host?: string,
    wallet?: string
}

export interface walletConfig {
    wallet_name: string,
    disable_private_keys?: boolean,
    blank?: boolean,
    passphrase?: string,
    avoid_reuse?: boolean,
    descriptors?: boolean,
    load_on_startup?: boolean,
    external_signer?: boolean,
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
            host: clientConfig.host || "http://localhost:18443",
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
            // Try with just the wallet name first
            const wallet = await this.client.command("createwallet", 
                walletConfig.wallet_name,
                walletConfig.disable_private_keys || false,
                walletConfig.blank || false,
                walletConfig.passphrase || "",
                walletConfig.avoid_reuse || false,
                walletConfig.descriptors || false,
                walletConfig.load_on_startup || null,
                walletConfig.external_signer || false
            )
            return wallet
            
        } catch (error) {
            console.log("error",error)
            throw error;
        }
    }

    public async loadWallet(walletName: string){
        try {
            // Use the main client (no wallet targeting) and pass wallet name as parameter
            const loadWalletInfo = await this.client.command("loadwallet", walletName)
            return loadWalletInfo
            
        } catch (error) {
            console.log("error",error)
            throw error;
        }
    }

    public async getWalletInfo(walletName: string){
        try {
            const walletClient = new BitcoinCore({
                ...this.clientConfig,
                wallet: walletName
            })
            // like not this.client.command (bcoz you dont want to limit change main configeach time you create a new wallet right)
            const walletInfo = await walletClient.command("getwalletinfo")
            return walletInfo

            
        } catch (error) {
            console.log("error",error)    
        }

    }

}

