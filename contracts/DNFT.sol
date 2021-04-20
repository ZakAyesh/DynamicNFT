pragma solidity 0.6.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";

contract dNFT is ERC721, VRFConsumerBase {
    //Begin defining state variables
    //State variables to store needed info for VRF
    bytes32 internal keyHash;
    uint256 internal fee;
    
    //State variables for dNFT
    uint256 public tokenCounter;

    // Ultimate nerd reference :)
    /* This enum could be any kind of metadata you also
       want to keep track of on-chain for reference. */
    // There is a corresponding EigenValue for each IpfsUri
    enum EigenValue {HESLEEP, HEATTAC, SUPERPOSITION}
    
    // This points to the metadata for each unique piece of art on Ipfs.
    string[] IpfsUri = [
    "https://ipfs.io/ipfs/QmZ8epAYRBVgmC89AkhMcYTvSXqaXoVyY1wDejcts8YfrF?filename=metadata1.json", 
    "https://ipfs.io/ipfs/QmYouRy6h83ifpmTx4MpN6rhg3ByCxhDBCAYsBFWPngjhX?filename=metadata2.json",
    "https://ipfs.io/ipfs/QmVsTvG8m5pZFCG9oaTRCxfFFzEHzi1YfptTgqX1h6xjKu?filename=metadata3.json"
    ];

    mapping(uint256 => EigenValue) public tokenIdToEigenValue;
    mapping(bytes32 => uint256) public requestIdToTokenId;
    
    //Begin defining logic
    constructor(address _vrfCoordinator,
                address _link,
                bytes32 _keyHash,
                uint _fee)
        VRFConsumerBase(
            _vrfCoordinator, // VRF Coordinator
            _link // LINK Token
        )
        ERC721("dNFTs", "PsiCat")
        public
    {
        keyHash = _keyHash;
        fee = _fee; 
        tokenCounter = 0;
    }

    // Creates a new ERC721 mNFT.
    // It is initialized at the third IpfsUri and EigenValue
    function createCollectible() public {
        uint256 newItemId = tokenCounter;
        string memory initialUri = IpfsUri[2];
        EigenValue initialEigenVal = EigenValue(2);
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, initialUri);
        tokenIdToEigenValue[newItemId] = initialEigenVal;
        tokenCounter = tokenCounter + 1;
    }
    
    // Override's default ERC721 transferFrom function to call VRF.
    /* Since the VRF is asynchronous we use a requestIdToTokenId 
     to map all VRF requests to the token we are transferring. */
    // This VRF request replaces the user provided seed with the block number.
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override(ERC721) {
        bytes32 requestId =
        requestRandomness(keyHash, fee, uint32(block.number));
        requestIdToTokenId[requestId] = tokenId;
        _transfer(from, to, tokenId);
    }

    /**
     * Callback function used by VRF Coordinator
     */
    function fulfillRandomness(bytes32 requestId, uint256 randomNumber)
        internal
        override
    {
        uint256 _tokenId = requestIdToTokenId[requestId];
        uint256 random2 = (randomNumber % 2);
        EigenValue newEigenVal = EigenValue(random2);
        string memory newUri = IpfsUri[random2];
        tokenIdToEigenValue[_tokenId] = newEigenVal;
        _setTokenURI(_tokenId, newUri);
    }
}
