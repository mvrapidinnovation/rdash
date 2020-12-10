const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');

const { InfuraAPI, mnemonic } = require('./secrets.json');

const royaleABI = require('./abis/RoyaleLP.json');
const rpTokenABI = require('./abis/RPToken.json');
const daiABI = require('./abis/DaiToken.json');

const crvABI = require('./abis/StableSwap3Pool.json')

const address = require('./addresses.json');

const provider = new HDWalletProvider(mnemonic, InfuraAPI);
const web3 = new Web3(provider);



function toDai(n) {
    return web3.utils.toWei(n, 'ether');
}

function toUsd(n) {
    let result = parseFloat(n) * 1e6;
    return result.toString();
}


var instance = new web3.eth.Contract(daiABI['abi'], address.mDai);
var getBalance = async() => {
    var bal = await instance.methods.balanceOf(address.RoyaleLP).call();
    console.log("DAI: ", bal);
}
getBalance();

var instance = new web3.eth.Contract(rpTokenABI['abi'], address.RPToken);
var getBalance = async() => {
    var bal = await instance.methods.balanceOf(address.RoyaleLP).call();
    console.log("RPT: ", bal);
}
getBalance();
