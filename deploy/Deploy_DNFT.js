module.exports = async ({
  getNamedAccounts,
  deployments,
  getChainId,
  getUnnamedAccounts,
}) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  //LINK Token address set to Rinkeby address. Can get other values at https://docs.chain.link/docs/link-token-contracts
  //VRF Details set for Rinkeby environment, can get other values at https://docs.chain.link/docs/vrf-contracts#config
  const VRF_COORDINATOR = "0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B";
  const LINK_TOKEN_ADDR = "0x01be23585060835e02b77ef475b0cc51aa1e0709";
  const VRF_KEYHASH =
    "0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311";
  const VRF_FEE = "100000000000000000";

  console.log("----------------------------------------------------");
  console.log("Deploying dNFT");
  const dNFT = await deploy("dNFT", {
    from: deployer,
    gasLimit: 4000000,
    args: [VRF_COORDINATOR, LINK_TOKEN_ADDR, VRF_KEYHASH, VRF_FEE],
  });

  console.log("dNFT deployed to: ", dNFT.address);
  console.log("Run the following command to fund contract with LINK:");
  console.log("npx hardhat fund-link --contract ", dNFT.address);
  console.log("Then create a dNFT with the following command:");
  console.log("npx hardhat create-collectible --contract ", dNFT.address);
  console.log("----------------------------------------------------");
};
