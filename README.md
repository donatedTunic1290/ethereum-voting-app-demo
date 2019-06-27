# ethereum-voting-demo
A Voting DApp built to show the basic use case of capturing votes using blockchain.

# Pre-requisites
1. Install Truffle using npm
2. Download Ganache and make sure its running at port 7545

## Steps:
1. Once you have the project cloned locally, go to the project root directory using your terminal. 
2. Run ```truffle compile``` to compile your smart contracts. Check the /build directory to view to the recently created network artifacts.
3. Run ```truffle migrate``` to deploy your contracts to your Ganache's private ethereum network.
4. Take note of your new Smart Contract address from the logs in your compiler. 
5. Now lets use our DApp to access our deployed smart contract functions. To start the DApp simply open client/src/index.html file in chrome or any of your preferred browser.
6. You will see that the DApp needs the address of your smart contract and a user account to access the functions on it. 
7. Copy paste the smart contract address you noted in step 4 to the address field and click on connect. The DApp automatically uses the 2nd account of local Ganache installation as the default sender account. You can change this to any other account you wish to use.
8. Once connected to the contract, the DApp will show you the current Voting status and let you vote for a party based on the pre-conditions set in our smart contract. 
