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
### 1. Get a block by height
 - Endpoint:
 ```
 /block/:index
 ```
 - Example:
 ```
 localhost:8000/block/4
 ```
### 2. Get a block by Hash
 - Endpoint:
 ```
 /stars/:hash
 ```
 - Example: 
 ```
 localhost:8000/stars/localhost:8000/stars/0a29018e...fac43f
 ```
### 3. Get a block by Address
 - Endpoint:
 ```
 /stars/:address
 ```
 - Example: 
 ```
 localhost:8000/stars/1KGex1mosL5gJhvghUScrBq8LqA37fs6gd
 ```
#### POST
### 1. Post a Notary Request
 - Endpoint:
 ```
 /requestvalidation
 ```
 - Post Body:
 ```
 {
	"address":"1LDeUW2itkQsh5uCp1PcMtPNAaJbmS6Bzb"
 }
 ```
 - Response:
 ```
 {
    "walletAddress": "1LDeUW2itkQsh5uCp1PcMtPNAaJbmS6Bzb",
    "requestTimeStamp": "1543419946",
    "message": "1LDeUW2itkQsh5uCp1PcMtPNAaJbmS6Bzb:1543419946:starRegistry",
    "validationWindow": 300
}
 ```
### 2. Post a Signature to validate
 - Endpoint:
 ```
 /message-signature/validate
 ```
 - Post Body:
 ```
{
	"address":"1LDeUW2itkQsh5uCp1PcMtPNAaJbmS6Bzb",
	"signature":"H7WQPQyQ3/RlbsLnN9Mbv7ih/VkTzwk9MQ3SPcJKQ6NzHoQPCcSkjn7rv8cTkhtd8Qgo3FPuWoPc9LMjiQEkIsM="
}
 ```
 - Response:
 ```
{
    "registerStar": true,
    "status": {
        "walletAddress": "1LDeUW2itkQsh5uCp1PcMtPNAaJbmS6Bzb",
        "requestTimeStamp": "1543419946",
        "message": "1LDeUW2itkQsh5uCp1PcMtPNAaJbmS6Bzb:1543419946:starRegistry",
        "validationWindow": 300,
        "messageSignature": true
    }
}
 ```
### 3. Post star data to notary
- Endpoint:
 ```
/block
 ```
 - Post Body:
 ```
{
	"address": "1LDeUW2itkQsh5uCp1PcMtPNAaJbmS6Bzb",
    "star": {
            "dec": "68° 52' 56.9",
            "ra": "16h 29m 1.0s",
            "mag":"4.83",
            "cen":"Centaurus",
            "story": "Found star using https://www.google.com/sky/"
        }
}
 ```
 - Response:
 ```
{
    "hash": "8c1cf853ebac0b20be3fb64a506e45a554367a1710837be84677465a376fc746",
    "height": 3,
    "body": {
        "address": "1LDeUW2itkQsh5uCp1PcMtPNAaJbmS6Bzb",
        "star": {
            "ra": "16h 29m 1.0s",
            "dec": "68° 52' 56.9",
            "mag": "4.83",
            "cen": "Centaurus",
            "story": "466f756e642073746172207573696e672068747470733a2f2f7777772e676f6f676c652e636f6d2f736b792f",
            "storyDecoded": "Found star using https://www.google.com/sky/"
        }
    },
    "time": "1543419976",
    "previousBlockHash": "95362592800054e687ab9715319048061d4dce240efaecee7e3698cc7e00620f"
}
 ```

## License
This project is licensed under the MIT License.

## Acknowledgments
* Udacity Blockchain Nanodegree Program facilitators and mentors
* Google
* Express.js documentation