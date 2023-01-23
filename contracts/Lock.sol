// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Lock {
    string message;

    constructor(string memory initalMessage) {
        message = initalMessage;
    }

    function getMessage() public view returns (string memory) {
        return message;
    }

    function sendEther(address payable _to) public payable {
        _to.transfer(address(this).balance);
    }
}
