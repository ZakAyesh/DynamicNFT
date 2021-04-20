require("@nomiclabs/hardhat-web3");

task("fund-link", "Funds a contract with LINK")
  .addParam("contract", "The address of the contract that requires LINK")
  .setAction(async (taskArgs) => {
    const contractAddr = taskArgs.contract;
    const networkId = network.name;
    console.log("Funding contract ", contractAddr, " on network ", networkId);
    const LINK_TOKEN_ABI = [
      {
        inputs: [
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "transfer",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];

    //set the LINK token contract address according to the environment
    switch (networkId) {
      case "mainnet":
        linkContractAddr = "0x514910771af9ca656af840dff83e8264ecf986ca";
        break;
      case "kovan":
        linkContractAddr = "0xa36085F69e2889c224210F603D836748e7dC0088";
        break;
      case "rinkeby":
        linkContractAddr = "0x01BE23585060835E02B77ef475b0Cc51aA1e0709";
        break;
      case "goerli":
        linkContractAddr = "0x326c977e6efc84e512bb9c30f76e30c160ed06fb";
        break;
      default:
        //default to kovan
        linkContractAddr = "0xa36085F69e2889c224210F603D836748e7dC0088";
    }
    //Fund with 1 LINK token
    const amount = web3.utils.toHex(1e18);

    //Get signer information
    const accounts = await hre.ethers.getSigners();
    const signer = accounts[0];

    //Create connection to LINK token contract and initiate the transfer
    const linkTokenContract = new ethers.Contract(
      linkContractAddr,
      LINK_TOKEN_ABI,
      signer
    );
    var result = await linkTokenContract
      .transfer(contractAddr, amount)
      .then(function (transaction) {
        console.log(
          "Contract ",
          contractAddr,
          " funded with 1 LINK. Transaction Hash: ",
          transaction.hash
        );
      });
  });

module.exports = {};
