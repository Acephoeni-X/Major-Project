require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

// const ALCHEMY_API_KEY = "CnYvuyuUI73YsH6oL";
// const PRIVATE_KEY =
//   "4c8b1c2221667e8cf85d650d317b8cb6c7601309610b5aa03904c55a3e4cf368";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
