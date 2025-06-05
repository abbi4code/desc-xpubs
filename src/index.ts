import { BitcoinCli } from "./cli";


async function runProgram(){
    const app = new BitcoinCli();

    await app.run()
}

runProgram.catch(error => {
    console.log("error",error)
    process.exit(1)
})