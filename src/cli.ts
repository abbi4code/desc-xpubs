// working on it
import {Command} from "commander"
import { BitcoinCoreService, BitcoinCoreConfig} from "./BitcoinCore"
// console.log("work in progress dude")

// import { BitcoinCoreConfig, BitcoinCoreService } from "./BitcoinCore"

// // dont have to mention port or host on regtest(managed by lib itself)
// const config: BitcoinCoreConfig = {
//     username: "abhishek",
//     password: "abhishek",
//     network: "regtest",
//     port: 18443,
//     host: "http://127.0.0.1:18443"
// }

// async function checkConnection(){
//     const client1 = new BitcoinCoreService(config);

//     const res = await client1.listWallets();

//     console.log("response",res)
// }

// checkConnection()


export class BitcoinCli {
    private program: Command
    private bitcoinService: BitcoinCoreService
    private config: BitcoinCoreConfig

    constructor(){
        this.program = new Command()
        this.config = {
            username: "abhishek",
            password: "abhishek",
            network: "regtest",
            host: "http://127.0.0.1:18443",
            port: 18443
        }

        this.bitcoinService = new BitcoinCoreService(this.config)

        this.setupCommands()
    }

    public setupCommands(){
        this.program.name("descXpubCli").description("Cli tool for Bitcoin descriptor & xpubs extraction").version("0.0.1")

        this.program.command("check-connection").description("check if bitcoin core node is running fine").action(async() => {
            console.log("connecting to bitcoin core node")
            const blockchainInfo = await this.bitcoinService.checkConnection();
            if(blockchainInfo){
                console.log("BlockChain info:", blockchainInfo)
            }else{
                console.log("connection failed...")
            }
        })
    }

    public async runCmds(){

        const info = await this.bitcoinService.checkConnection();
        if(!info){
            console.error("Bitcoin Core node is not reachablee.. check your node and configuration.");
            process.exit(1);
        }
        this.program.parse(process.argv)
    }
}