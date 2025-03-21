require('dotenv').config(); // .env 파일을 로드하여 환경 변수 사용
const { PRIVATE_KEY, INFURA_PROJECT_ID } = process.env; // 환경 변수에서 PRIVATE_KEY와 INFURA_PROJECT_ID 가져오기

console.log("privatkey : ", PRIVATE_KEY);
console.log("ID : ", INFURA_PROJECT_ID);

const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {

  networks: {

    sepolia: {
      provider: () => new HDWalletProvider(
        [PRIVATE_KEY],
        `https://sepolia.infura.io/v3/${INFURA_PROJECT_ID}`),
      network_id: 11155111,       // Goerli's id
      confirmations: 2,    // # of confirmations to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },

  },

  mocha: {
    timeout: 100000
  },


  compilers: {
    solc: {
      version: "0.8.21",      // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 200
        },
        evmVersion: "byzantium"
      }
    }
  },

};
