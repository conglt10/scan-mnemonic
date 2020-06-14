const { EthHdWallet } = require('eth-hd-wallet');
const bip39 = require('bip39');
const axios = require('axios');

async function bruteForce() {
  try {
    let mnemonic = bip39.generateMnemonic();
    let wallet = EthHdWallet.fromMnemonic(mnemonic);
    let [address] = wallet.generateAddresses(1);

    const apiKey = 'YOUR_API_KEY';

    let response = await axios.get(
      `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`
    );

    let balance = response.data.result;
    console.log({ balance });
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

bruteForce();
