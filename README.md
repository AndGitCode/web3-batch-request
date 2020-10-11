# web3-batch-request

web3-batch-request is a node package for batching requests on the eth blockchain with web3 1.x. It returns a promise that resolves when all requests are complete or rejects when one fails. If you are using infura or another node provider which limits your requests, your batched requests will count as a single request.

For the package to work you will need to provide a web3 instance when making a batch call.


### Usage:

Firstly install the dependency to your project

```
npm i web3-batch-request --save
```

Import the dependency where you need it:

```
const { makeBatchRequest } = require('web3-batch-request');
```

Create some calls that you would like to batch. A call is an object with the following properties:

```
{
    ethCall: web3 call object,
    onSuccess: Function,
    onError: Function
}
```

An example of the above would be:

```
const usdtTokenAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7';

{
    ethCall: new web3.eth.Contract(ERC20_ABI, usdtTokenAddress).methods.decimals().call,
    onSuccess: result => console.log("We can do something with our response if we like: " + result),
    onError: error => console.log("We can do some error handling with the error: " + err)
}
```

Once you have created some call objects, and added them to an array, you can perform the batch request.

```
const calls = [callOne, callTwo, callThree];
const web3 = new Web3(new Web3.providers.HttpProvider(`https://localhost:8545`));

[callOneResponse, callTwoResponse, callThreeResponse] = await makeBatchRequest(web3, calls);
```

You can also pass an options object when calling the makeBatchRequest function. The two options permitted are:
- allowFailures - if one of the calls fails, the promise will still resolve 
- verbose - useful for debugging. will log both success and errors of calls.

```
[callOneResponse, callTwoResponse, callThreeResponse] = await makeBatchRequest(web3, calls, { allowFailures: true, verbose: true });
```

by default, both these options are set to false.

### Examples

There's example code in the examples folder, largely the same as the example above. To use this you can rename the .env.example file to .env and change your infura project id in the file. If using a local node, replace the provider in the example with the RPC url of your local node before running.