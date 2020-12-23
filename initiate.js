const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');

const { InfuraAPI, mnemonic } = require('./secrets.json');

const royaleABI = require('./abis/RoyaleLP.json');
const rpTokenABI = require('./abis/RPToken.json');
const daiABI = require('./abis/DaiToken.json');
const usdcABI = require('./abis/UsdcToken.json');

const crvABI = require('./abis/StableSwap3Pool.json');
const crvTokenABI = require('./abis/PoolToken.json');

const rCurveABI = require('./abis/rCurve.json');

const mRoya = require('./abis/MRoya.json');
const mRoyaFarm = require('./abis/MRoyaFarm.json');

const address = require('./addresses.json');

const provider = new HDWalletProvider(mnemonic, InfuraAPI);
const web3 = new Web3(provider);


// UTILITY FUNCTIONS
function toDai(n) {
    return web3.utils.toWei(n, 'ether');
}

function toUsd(n) {
    let result = parseFloat(n) * 1e6;
    return result.toString();
}


/* DaiToken Instance */
var instance = new web3.eth.Contract(daiABI['abi'], address.mDai);
var getBalance = async() => {
    var bal = await instance.methods.balanceOf(address.RoyaleLP).call();
    console.log("DAI: ", bal);
}
getBalance();


/* RPToken INSTANCE */
var instance = new web3.eth.Contract(rpTokenABI['abi'], address.RPToken);
var totalSup = async() => {
    var sup = await instance.methods.totalSupply().call();
    console.log("RPT totalSupply: ", sup);
}
totalSup();

var getBalance = async() => {
    var bal = await instance.methods.balanceOf(address.RoyaleLP).call();
    console.log("RPT: ", bal);
}
getBalance();

// INITIAL MINT FOR ROYALELP
var mint = async() => {
    var txn = await instance.methods.mint(address.RoyaleLP, toDai('3000')).send({
        from: '0xDBB441ba5C6db917C51f2E292ab4d4389aE52626'
    });
    return txn;
}
// mint().then(console.log).catch(console.log);

var burn = async() => {
    var txn = await instance.methods.burn(address.RoyaleLP, toDai('3000')).send({
        from: '0xDBB441ba5C6db917C51f2E292ab4d4389aE52626'
    });
    return txn;
}
// burn().then(console.log).catch(console.log);

// SET MINTER FOR RPT
var setMinter = async() => {
    var txn = await instance.methods.setCaller(address.RoyaleLP).send({
        from: '0xDBB441ba5C6db917C51f2E292ab4d4389aE52626'
    });

    return txn;
}
// setMinter().then(console.log).catch(console.log);

var viewMinter = async() => {
    var txn = await instance.methods.caller().call();
    return txn;
}
// viewMinter().then(console.log).catch(console.log);


/* ROYALELP INSTANCE */
var instance = new web3.eth.Contract(royaleABI['abi'], address.RoyaleLP);

// First Do this for ROYALELP
var set = async() => {
    var txn = await instance.methods.setInitialDeposit().send({
        from: '0xDBB441ba5C6db917C51f2E292ab4d4389aE52626'
    });
    return txn;
}
// set().then(console.log).catch(console.log);

// SET THE YIELD OPTIMIZER
var setYieldOpt = async() => {
    var txn = await instance.methods.setYieldOpt(address.RCurve).send({
        from: '0xDBB441ba5C6db917C51f2E292ab4d4389aE52626'
    });

    return txn;
}
// setYieldOpt().then(console.log).catch(console.log);

var getRPT = async() => {
    var rpt = await instance.methods.checkBurnAmount([toDai('0'), toUsd('0'), toUsd('500')]).call();
    return rpt;
}
// getRPT().then(console.log);

/* rCurve INSTANCE */
var instance = new web3.eth.Contract(rCurveABI['abi'], address.RCurve);
const setpool = async() => {
    var txn = await instance.methods.setPool();
}