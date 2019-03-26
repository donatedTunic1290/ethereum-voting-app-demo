const Web3 = require('web3');

let ipaddress;
let contractAddress;
let openLab;
let web3;

const abi = [
	{
		"constant": true,
		"inputs": [],
		"name": "totalClicks",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "addClick",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "removeClick",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_text",
				"type": "bytes32"
			}
		],
		"name": "addText",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getText",
		"outputs": [
			{
				"name": "",
				"type": "bytes32[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getClicks",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

let addClick = () => {
	openLab.addClick({ from: web3.eth.accounts[0] }, (err, res) => {
		if (err) {
			console.log('err ' + err);
		} else {
			console.log('res ' + res);
			setClicks();
			setStatus(res);
		}
	})
};


let removeClick = () => {
	openLab.removeClick({from: web3.eth.accounts[0]}, (err, res) => {
		if (err) {
			console.log('err ' + err);
		} else {
			console.log('res ' + res);
			setClicks();
			setStatus(res);
		}
	})
};


let setClicks = function () {
	openLab.getClicks.call(function (e, r) {
		const status = document.getElementById('clicks')
		if (r) {
			status.innerHTML = r.c[0];
		} if (e) {
			console.log(e);
		}
	});
};

let setStatus = function (transactionId) {
	
	console.log('transactionId ' + transactionId);
	
	
	web3.eth.getTransaction(transactionId, function (e, r) {
		const status = document.getElementById('transaction');
		status.innerHTML = JSON.stringify(r, undefined, 2);
	});
	
	web3.eth.getTransactionReceipt(transactionId, function (e, r) {
		const status = document.getElementById('receipt');
		status.innerHTML = JSON.stringify(r, undefined, 2);
		getGasCost(r.gasUsed);
	});
};

let getGasCost = function (gasAmount) {
	let gweiCost = 0.00000913432; //INR
	let totalCost = gweiCost * gasAmount;
	const status = document.getElementById('cost');
	status.innerHTML = '' + totalCost;
};

let connected = function () {
	let button = document.getElementById('connectToBlockchain');
	button.innerText = 'Connected to blockchain';
	button.setAttribute('disabled', 'true');
};


let start = function () {
	ipaddress = document.getElementById('ipaddress').value;
	contractAddress = document.getElementById('contractAddress').value;
	
	if (ipaddress && contractAddress) {
		
		if (typeof web3 !== 'undefined') {
			console.warn(
					'Using web3 detected from external source.' +
					' If you find that your accounts don\'t appear or you have 0 Votes,' +
					' ensure you\'ve configured that source properly.' +
					' If using MetaMask, see the following link.' +
					' Feel free to delete this warning. :)' +
					' http://truffleframework.com/tutorials/truffle-and-metamask'
			);
			// Use Mist/MetaMask's provider
			window.web3 = new Web3(web3.currentProvider)
		} else {
			console.warn(
					'No web3 detected. Falling back to http://127.0.0.1:9545.' +
					' You should remove this fallback when you deploy live, as it\'s inherently insecure.' +
					' Consider switching to Metamask for development.' +
					' More info here: http://truffleframework.com/tutorials/truffle-and-metamask'
			);
			// fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
			window.web3 = new Web3(new Web3.providers.HttpProvider(ipaddress));
		}
		
		web3 = new Web3(window.web3.currentProvider);
		var contract = web3.eth.contract(abi);
		openLab = contract.at(contractAddress);
	}
	
	connected();
	setClicks();
	
};