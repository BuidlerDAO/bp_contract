import { ethers, upgrades } from "hardhat";

import "minimist"

async function main() {
  const {TOKEN_NAME, TOKEN_SYMBOL, OWNER} = process.env
  if (!TOKEN_NAME || !TOKEN_SYMBOL || !OWNER) {
    return
  }
  const Contract = await ethers.getContractFactory("BuidlerPoint");
  const instance = await upgrades.deployProxy(Contract, [TOKEN_NAME, TOKEN_SYMBOL, OWNER]);
  const ContractInfo = await instance.deployed();

  console.log(ContractInfo.address)
}

main()

