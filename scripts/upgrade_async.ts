import {readFileSync} from "fs";
import {ethers, upgrades} from "hardhat";

const {NETWORK} = process.env

async function main() {
  const data = readFileSync(`.openzeppelin/${NETWORK}.json`, "utf-8")
  const Vitae3V2 = await ethers.getContractFactory("BuidlerPoint");
  const dataJson: {proxies: {address: string}[]} = JSON.parse(data);
  for (const proxy of dataJson.proxies) {
    const Vitae3V2Instance = await upgrades.upgradeProxy(
        proxy.address, // 待升级合约的地址
        Vitae3V2,
    );
    console.log(Vitae3V2Instance.deployTransaction.hash)
  }
}

main()