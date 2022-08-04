# Charging columns

## The project
The aim of this project is to create a basic DApp which allows to book electric column chargers for electric or hybrid plug-in vehicles.

The web interface looks like the following

![Interface, charging columns](/src/images/interface.png)

Charging columns are listed, with the possibility of booking them through the button "Book now".

In order for the DApp to interact with the blockchain, the installation of Ganache and Metamask is required.
The DApp works with the integration of MetaMask in the chosen browser, so once the button "Book now" is clicked, a Metamask pop up will ask the cofirmation of performing the transaction.

## Requirements

- Node.js and `npm`
- `truffle` and `ganache`
- Metamask

## Steps
After cloning the repository, perform the following steps in the repository directory:

1. Install the Node libraries: `npm install`

3. Compile the Solidity code: `truffle compile`

4. Launch Ganache

5. In the `truffle-config.js` file, put the name of the port and the host address present in the "network id" and "rpc server" spaces in Ganache interface.
![Ganache, names](/src/images/ganache.png)

6. Deploy the smart contract to the blockchain: `truffle migrate`

7. Launch the server and the DApp in the browser: `npm run dev`

