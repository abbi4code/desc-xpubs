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
        console.log("Wallet info for abhishek:", walletInfo);
    } else {
        console.log("Wallet 'abhishek' not found");
    }

    // const loadwallet = await client.loadWallet("abhishek123.dat")
    // console.log("loadwallet",loadwallet)

    const walletBalance = await client.getBalance("abhishek")
    console.log("balance",walletBalance)

    const walletdesc = await client.listdescriptors("abhishek")
    // console.log("walletdesc",walletdesc.descriptors[0])

    const listDescriptor = walletdesc.descriptors
    // console.log("descLength",listDescriptor)

    let wpkh = []
    for(let desc of listDescriptor){
        if(desc.desc.startsWith("sh")){
            wpkh.push(desc.desc)
            break;
        }
    }
    const validReg = /^(?<wrapper>\w+)?\(?\b(?<type>\w+)\((?<body>.+)\)\)?#(?<checksum>[a-z0-9]+)$/i;

    // if(wpkh[0].mat)


    console.log("all sh(wpkh):", wpkh)


}

runProgram().catch(error => {
    console.log("error",error)
    process.exit(1)
})