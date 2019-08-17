module.exports = {

    networks: {
        geth: {
            host: "127.0.0.1", // Localhost (default: none)
            port: 2019, // Standard Ethereum port (default: none)
            network_id: "20190713", // Any network (default: none)
            gas: 8000000, // Gas sent with each transaction (default: ~6700000)
            gasPrice: 5000000000, // 5 gwei (in wei) (default: 100 gwei)
            // from: <address>,        // Account to send txs from (default: accounts[0])
        },
	    development: {
		    host: "localhost", // Localhost (default: none)
		    port: 7546, // Standard Ethereum port (default: none)
		    network_id: "5777", // Any network (default: none)
		    gas: 6200000, // Gas sent with each transaction (default: ~6700000)
		    gasPrice: 5000000000, // 5 gwei (in wei) (default: 100 gwei)
		    // from: <address>,        // Account to send txs from (default: accounts[0])
	    },

        // Useful for private networks
        // private: {
        // provider: () => new HDWalletProvider(mnemonic, `https://network.io`),
        // network_id: 2111,   // This network is yours, in the cloud.
        // production: true    // Treats this network as if it was a public net. (default: false)
        // }
    },

    // Set default mocha options here, use special reporters etc.
    mocha: {
        // timeout: 100000
    },

    // Configure your compilers
    compilers: {
        solc: {
            version: "0.5.9", // Fetch exact version from solc-bin (default: truffle's version)
            settings: { // See the solidity docs for advice about optimization and evmVersion
                optimizer: {
                    enabled: false,
                    runs: 200
                },
                evmVersion: "petersburg"
            }
        }
    }
};