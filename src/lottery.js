import web3Inst from "./web3";

const address = "0x55E6Cd2Fd1E51efd0af814e4435b79f2dDDa31Cf";

const abi = [
    {
        "constant":true,
        "inputs":[],
        "name":"getPlayersList",
        "outputs":[{
            "name":"",
            "type":"address[]"
        }],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[],
        "name":"manager",
        "outputs":[{
            "name":"",
            "type":"address"
        }],
        "payable":false,"stateMutability":"view","type":"function"
    },
    {
        "constant":false,
        "inputs":[],
        "name":"pickWinner",
        "outputs":[],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"function"
    },
    {
        "constant":false,
        "inputs":[],
        "name":"enter",
        "outputs":[],
        "payable":true,
        "stateMutability":"payable",
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[{
            "name":"",
            "type":"uint256"
        }],
        "name":"players",
        "outputs":[{
            "name":"",
            "type":"address"
        }],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "inputs":[],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"constructor"
    }
];

export default new web3Inst.eth.Contract(abi, address);