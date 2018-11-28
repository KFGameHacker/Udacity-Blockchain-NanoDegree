# Private Blockchain Star Notary Service

A service that allows users to claim ownership of their favorite star in the night sky. It is the 4th project for Udacity's Blockchain Nanodegree program.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Installing Node.js and NPM is pretty straightforward using the installer package available from the (Node.js® web site)[https://nodejs.org/en/].

Built with **Express.js** [https://expressjs.com/]

### Configuring your project

- Use NPM to initialize your project and create package.json to store project dependencies.
```
npm init
```
*Note: the entry point is `app.js`*
- Install crypto-js with --save flag to save dependency to our package.json file
```
npm install crypto-js --save
```
- Install level with --save flag
```
npm install level --save
```
- Install Express.js with --save flag
```
npm install express --save
```
- Install hex2ascii with --save flag
```
npm install hex2ascii --save
```
- Install bitcoinjs-message with --save flag
```
npm i bitcoinjs-message --save
```
- Install bitcoinjs-lib with --save flag
```
npm i bitcoinjs-lib --save OR npm i --ignore-scripts bitcoinjs-lib --save
```
## Running the tests
To start the server:
```
node app.js
```
The sever will run on http://localhost:8000/

### Endpoints
Below is an instruction of how to use Postman to test the endpoints:
#### GET
1. Get a block by height


## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments
* Udacity Blockchain Nanodegree Program facilitators and mentors
* Google
* Express.js documentation