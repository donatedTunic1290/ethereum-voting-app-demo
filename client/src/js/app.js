const Web3 = require('web3');

let ipaddress;
let contractAddress;
let voting;
let web3;
let connectedUser;
let resultContainer = document.getElementById('votingResult');
let resultResultContainer = document.getElementById('resultResult');
let startVotingButton = document.getElementById('startVotingButton');
let votingBox = document.getElementById('votingBox');
let resultBox = document.getElementById('resultBox');

const abi = [
	{
		"constant": true,
		"inputs": [],
		"name": "isVoting",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function",
		"signature": "0x1bbef399"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "votes",
		"outputs": [
			{
				"name": "receiver",
				"type": "address"
			},
			{
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function",
		"signature": "0xd8bff5a5"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor",
		"signature": "constructor"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "startVoting",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function",
		"signature": "0x1ec6b60a"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "stopVoting",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function",
		"signature": "0xfab2f86b"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "addVote",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function",
		"signature": "0x6cea0e46"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "removeVote",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function",
		"signature": "0x49aa4ee2"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "voterAddress",
				"type": "address"
			}
		],
		"name": "getVote",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function",
		"signature": "0x8d337b81"
	}
];

let getConnectedUser = () => {
	connectedUser = document.getElementById('connectedUser').value;
	return connectedUser;
};

let addVote = () => {
	let receiverAddress = document.getElementById('receiverAddress').value;
	if (receiverAddress.length > 0) {
		voting.addVote(receiverAddress, {from: getConnectedUser()}, (err, res) => {
			if (err) {
				printError(err);
			} else {
				console.log(res);
				printResult(res);
				setLogs(res);
			}
		});
	} else {
		resultContainer.innerText = 'Please mention who you want to vote for!';
	}
};


let removeVote = () => {
	voting.removeVote({from: getConnectedUser()}, (err, res) => {
		if (err) {
			printError(err);
		} else {
			console.log(res);
			printResult(res);
			setLogs(res);
		}
	});
};

let getVote = () => {
	let voterAddress = document.getElementById('voterAddress').value;
	voting.getVote(voterAddress, {from: getConnectedUser()}, (err, res) => {
		if (err) {
			resultResultContainer.innerHTML = err.toString().split(':')[2].substring(7);
		} else {
			console.log(res);
			resultResultContainer.innerText = 'Voted for: ' + res;
		}
	});
};

let startVoting = () => {
	console.log(startVotingButton.innerText);
	if (startVotingButton.innerText === 'Stop Voting') {
		voting.stopVoting({from: getConnectedUser()}, (err, res) => {
			if (err) {
				printError(err);
			} else {
				printResult(res);
				setLogs(res);
				checkVotingStatus();
			}
		});
	} else {
		voting.startVoting({from: getConnectedUser()}, (err, res) => {
			if (err) {
				printError(err);
			} else {
				printResult(res);
				setLogs(res);
				checkVotingStatus();
			}
		});
	}
};

let stopVoting = () => {
};

let printError = function (error) {
	resultContainer.innerHTML = error.toString().split(':')[2].substring(7);
};

let printResult = function (result) {
	resultContainer.innerText = result;
};

let setLogs = function (transactionId) {
	
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
	let gweiCost = (parseInt(web3.eth.gasPrice.toString()) / 1000000000)  * 0.000021199; // Cost of 20 Gwei in INR as on 27th June 2019
	let totalCost = gweiCost * gasAmount;
	const status = document.getElementById('cost');
	status.innerHTML = '' + totalCost;
};

let errorConnection = function () {
	let button = document.getElementById('connectToBlockchain');
	button.innerText = 'Could not connect to blockchain. Check your console. Refresh page to retry.';
	button.setAttribute('disabled', 'true');
	votingBox.style.display = 'none';
	startVotingButton.setAttribute('disabled', 'true');
};

let checkVotingStatus = function () {
	voting.isVoting.call(function (err, result) {
		const status = document.getElementById('votingStatus');
		if (!err) {
			if (result) {
				status.innerHTML = 'OPEN';
				startVotingButton.innerText = 'Stop Voting';
			} else {
				status.innerHTML = 'CLOSED';
				startVotingButton.innerText = 'Start Voting';
			}
			connected();
		} else {
			console.log(err);
			errorConnection();
		}
	});
};

let connected = function () {
	let button = document.getElementById('connectToBlockchain');
	button.innerText = 'Connected to ' + contractAddress;
	button.setAttribute('disabled', 'true');
	votingBox.style.display = 'block';
	resultBox.style.display = 'block';
	startVotingButton.disabled = false;
};


let connectToBlockchain = function () {
	// ipaddress = document.getElementById('ipaddress').value;
	ipaddress = 'http://localhost:7546';
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
					'No web3 detected. Falling back to http://127.0.0.1:7545.' +
					' You should remove this fallback when you deploy live, as it\'s inherently insecure.' +
					' Consider switching to Metamask for development.' +
					' More info here: http://truffleframework.com/tutorials/truffle-and-metamask'
			);
			// fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
			window.web3 = new Web3(new Web3.providers.HttpProvider(ipaddress));
		}
		
		web3 = new Web3(window.web3.currentProvider);
		let contract = web3.eth.contract(abi);
		voting = contract.at(contractAddress);
		
		let userField = document.getElementById('connectedUser');
		connectedUser = web3.eth.accounts[3];
		userField.setAttribute('value', connectedUser);
	}
	checkVotingStatus();
};