const Voting = artifacts.require('./Voting.sol');

module.exports = function(deployer, network, accounts) {
	
	return deployer
			.then(() => {
				return deployer.deploy(
						Voting
				);
			});
};