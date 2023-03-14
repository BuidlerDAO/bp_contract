import { expect } from "chai";
import { ethers} from "hardhat";

describe("WorldCup", function () {
  async function deployWorldCupFixture() {
    const NFT_NAME = "worldCup";
    const SYMBOL = "worldCup";
    const BLIND_BOX_IMG = "https://nftstorage.link/ipfs/bafybeifiwv46bnwtkdfz5zhjuzpvunpfg7bfhx637qcrdae4jafjmfteru/";
    const CONTRACT_METADATA = ""
    const [owner, addr1, addr2] = await getFixedGasSigners(30000000);
    
    const Football = await ethers.getContractFactory("Football");
    const football = await Football.deploy("FOOTBALL", "FOOTBALL");
    await football.deployed();

    const WorldCup = await ethers.getContractFactory("WorldCup");
    const worldCup = await WorldCup.deploy(NFT_NAME, SYMBOL, BLIND_BOX_IMG, CONTRACT_METADATA, football.address);
    await worldCup.deployed();

    await football.connect(owner).addMinter(worldCup.address);
    return {WorldCup, worldCup, Football, football, BLIND_BOX_IMG, owner, addr1, addr2}
  }
})