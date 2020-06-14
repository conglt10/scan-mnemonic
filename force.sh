#!/bin/bash
for value in {1..1000}
do
node jsonrpc.js
echo $value
done