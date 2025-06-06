import { BitcoinCoreService } from "./BitcoinCore";
import { BitcoinCli } from "./cli";
import { walletConfig } from "./BitcoinCore";

async function runProgram(){
    const app = new BitcoinCli();

    // await app.runCmds()
    const walletConfig:walletConfig = {
        wallet_name: "abhishek123.dat",
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
    // const wallet = await client.createWallet(walletConfig)

    const allWallets = await client.listWallets();
    console.log("allWallets",allWallets)

    
    if (allWallets && allWallets.includes("abhishek")) {
        const walletInfo = await client.getWalletInfo("abhishek");
        console.log("Wallet info for abhishek:", walletInfo.balance);
    } else {
        console.log("Wallet 'abhishek' not found");
    }

    // const loadwallet = await client.loadWallet("abhishek123.dat")
    // console.log("loadwallet",loadwallet)

    const walletBalance = await client.getBalance("abhishek")
    console.log("balance",walletBalance)
}

runProgram().catch(error => {
    console.log("error",error)
    process.exit(1)
})