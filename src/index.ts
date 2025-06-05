// working on it

console.log("work in progress dude")

import { BitcoinCoreConfig, BitcoinCoreService } from "./BitcoinCore"

// dont have to mention port or host on regtest(managed by lib itself)
const config: BitcoinCoreConfig = {
    username: "abhishek",
    password: "abhishek",
    network: "regtest",
    port: 18443,
    host: "http://127.0.0.1:18443"
}

async function checkConnection(){
    const client1 = new BitcoinCoreService(config);

    const res = await client1.checkConnection();

    console.log("response",res)
}

checkConnection()