const { expect } = require("chai");

describe("dNFT", async function () {
  //LINK Token address set to Rinkeby address. Can get other values at https://docs.chain.link/docs/link-token-contracts
  //VRF Details set for Rinkeby environment, can get other values at https://docs.chain.link/docs/vrf-contracts#config
  const VRF_COORDINATOR = "0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B";
  const LINK_TOKEN_ADDR = "0x01be23585060835e02b77ef475b0cc51aa1e0709";
  const VRF_KEYHASH =
    "0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4";
  const VRF_FEE = "100000000000000000";

  it("Deploys to Rinkeby testnet and creates collectible", async function () {
    //deploy the contract
    this.timeout(0);
    const DNFT = await ethers.getContractFactory("dNFT");
    const dNFT = await DNFT.deploy(
      VRF_COORDINATOR,
      LINK_TOKEN_ADDR,
      VRF_KEYHASH,
      VRF_FEE
    );
    await dNFT.deployed();

    //Now that contract is funded, we can call the function to do the data request
    await hre.run("create-collectible", {
      contract: dNFT.address,
    });

    const tokenid = await dNFT.tokenCounter();

    expect(tokenid.toNumber()).to.be.greaterThan(0);
  });
});
