const { EthHdWallet } = require('eth-hd-wallet');
const Web3 = require('web3');
const bip39 = require('bip39');
const web3 = new Web3('https://mainnet.infura.io/v3/09caf3b3afa84f6cb9ec0055114b176a');

async function hack() {
  try {
    let mnemonic = bip39.generateMnemonic();
    let wallet = EthHdWallet.fromMnemonic(mnemonic);
    let [address] = wallet.generateAddresses(1);
    if (address === '0xcaad5b1def4c747967959fc5a797c04f8855db34') {
      console.log(mnemonic);
      console.log('----------------------BOOM---------------------');
    }
    let balance = await web3.eth.getBalance(address);
    if (balance > 0) {
      let privateKey = wallet.getPrivateKey(address);
      privateKey = privateKey.toString('hex');
      console.log({ privateKey });
      console.log({ balance });
    }
  } catch (err) {
    console.log(err);
  }
}

for (let i = 0; i < 200; i++) {
  hack();
}

console.log('Done!');
