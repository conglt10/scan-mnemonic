#!/bin/bash
for value in {1..10000}
do
curl -s -X POST --data '{"jsonrpc":"2.0", "method":"eth_getBalance", "params":["0x19171a5da52276b6a034CB859ddA1e905739F8B2", "latest"], "id":1}' https://mainnet.infura.io/v3/09caf3b3afa84f6cb9ec0055114b176a
done