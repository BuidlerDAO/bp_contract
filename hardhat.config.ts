import {HardhatUserConfig, task, types} from "hardhat/config";
import "@openzeppelin/hardhat-upgrades";
import "@nomicfoundation/hardhat-toolbox";

const ETH_PROVIDER: string = process.env.ETH_PROVIDER!
const ACCOUNT_PRIVATE_KEY: string = process.env.ACCOUNT_PRIVATE_KEY!
const GAS_PRICE: string = process.env.GAS_PRICE!
let gasPrice: number | "auto";

if (GAS_PRICE != "") {
    gasPrice = parseInt(GAS_PRICE, 10)
} else {
    gasPrice = "auto"
}

if (ETH_PROVIDER === "" || ACCOUNT_PRIVATE_KEY === "") {
    console.log("empty provider api key or account private key")
    process.exit(1)
}

task("flat", "Flattens and prints contracts and their dependencies (Resolves licenses)")
  .addOptionalVariadicPositionalParam("files", "The files to flatten", undefined, types.inputFile)
  .setAction(async ({ files }, hre) => {
    let flattened = await hre.run("flatten:get-flattened-sources", { files });
    
    // Remove every line started with "// SPDX-License-Identifier:"
    flattened = flattened.replace(/SPDX-License-Identifier:/gm, "License-Identifier:");
    flattened = `// SPDX-License-Identifier: MIXED\n\n${flattened}`;

    // Remove every line started with "pragma experimental ABIEncoderV2;" except the first one
    flattened = flattened.replace(/pragma experimental ABIEncoderV2;\n/gm, ((i) => (m) => (!i++ ? m : ""))(0));
    console.log(flattened);
  });


const config: HardhatUserConfig = {
    solidity: "0.8.9",
    networks: {
        vitae3: {
            url: ETH_PROVIDER,
            accounts: [ACCOUNT_PRIVATE_KEY],
            timeout: 40000,
            gasPrice: gasPrice,
        },
    },
};


export default config;
