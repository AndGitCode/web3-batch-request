require('dotenv').config();

const Web3 = require('web3');
const { makeBatchRequest } = require('./../index');
const ERC20_ABI = require('./abi/ERC20_ABI.json');

let web3 = new Web3(
    new Web3.providers.HttpProvider(`https://${process.env.NETWORK}.infura.io/v3/${process.env.PROJECT_ID}`)
);

const USDT_ADDRESS = '0xdac17f958d2ee523a2206206994597c13d831ec7';
const DAI_ADDRESS = '0x6b175474e89094c44da98b954eedeac495271d0f';

let tokensToGetDecimalsFor = [USDT_ADDRESS, DAI_ADDRESS];

let calls = [];

for(let i = 0; i < tokensToGetDecimalsFor.length; i++) {
    let tokenAddress = tokensToGetDecimalsFor[i];
    calls.push({
        ethCall: new web3.eth.Contract(ERC20_ABI, tokenAddress).methods.decimals().call,
        onSuccess: result => console.log("Can perform an action with result: " + result),
        onError: () => {}
    });
}

async function getDecimalsForTokens() {
    [usdtDecimals, daiDecimals] = await makeBatchRequest(web3, calls, {allowFailures: true, verbose: true});

    console.log("Decimals for USDT: " + usdtDecimals.value);
    console.log("Decimals for DAI: " + daiDecimals.value);
}

getDecimalsForTokens();