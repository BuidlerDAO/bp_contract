import { ethers, upgrades } from "hardhat";

import "minimist"

async function main() {
  const {TOKEN_NAME, TOKEN_SYMBOL} = process.env
  if (!TOKEN_NAME || !TOKEN_SYMBOL) {
    return
  }
  const Contract = await ethers.getContractFactory("BuidlerPoint");
  const instance = await upgrades.deployProxy(Contract, [TOKEN_NAME, TOKEN_SYMBOL]);
  const ContractInfo = await instance.deployed();

  console.log(ContractInfo.address)
}

main()


