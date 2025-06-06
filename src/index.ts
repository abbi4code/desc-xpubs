import { BitcoinCoreService } from "./BitcoinCore";
import { BitcoinCli } from "./cli";
import { walletConfig } from "./BitcoinCore";

async function runProgram(){
    const app = new BitcoinCli();

    // await app.runCmds()
    const walletConfig:walletConfig = {
        wallet_name: "abhishek1",
        disable_private_keys: false,
        blank: false,
        passphrase: "",
        avoid_reuse: false,
        descriptors: true
    }

    const client = new BitcoinCoreService({
        username: "abhishek",
        password: "abhishek",
        network: "regtest",
        host: "http://127.0.0.1:18443",
        port: 18443
    });

    const res = await client.checkConnection()
    const wallet = await client.createWallet(walletConfig)
    console.log("wallet",wallet)
}

runProgram().catch(error => {
    console.log("error",error)
    process.exit(1)
})