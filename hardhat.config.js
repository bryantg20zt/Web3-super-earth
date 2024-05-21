require("@nomiclabs/hardhat-ethers");

const PRIVATE_KEY = '5470b9931dbad67febb8acf1d3d47f34b6392790c4b1c68976b76b63c96ad1a1';

module.exports = {
  solidity: "0.8.0",
  etherscan: {
    apiKey: 'WJG1UMRNCANP69K3FAGGRY9E5MBIUQWPQV'
  },
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/mDnTZLMCncXV6hUgQIF7UhuG7lZsCISy",
      accounts: [`0x${PRIVATE_KEY}`],
    }
  }
};
