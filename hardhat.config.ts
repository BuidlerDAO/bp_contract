import {HardhatUserConfig} from "hardhat/config";
import "@openzeppelin/hardhat-upgrades";
import "@nomicfoundation/hardhat-toolbox";

const ETH_PROVIDER: string = process.env.ETH_PROVIDER!
const ACCOUNT_PRIVATE_KEY: string = process.env.ACCOUNT_PRIVATE_KEY!

if (ETH_PROVIDER === "" || ACCOUNT_PRIVATE_KEY === "") {
    console.log("empty provider api key or account private key")
    process.exit(1)
}

const config: HardhatUserConfig = {
    solidity: "0.8.9",
    networks: {
        vitae3: {
            url: ETH_PROVIDER,
            accounts: [ACCOUNT_PRIVATE_KEY],
            timeout: 40000,
        },
    },
};

export default config;
