const Openlab = artifacts.require('./Openlab.sol');

module.exports = function(deployer, network, accounts) {
	
	return deployer
			.then(() => {
				return deployer.deploy(
						Openlab
				);
			});
};