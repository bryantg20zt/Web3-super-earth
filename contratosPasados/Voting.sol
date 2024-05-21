// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    address public owner;
    mapping(string => uint256) public votes;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function vote(string memory _candidate) public {
        votes[_candidate] += 1;
    }

    function getVotes(string memory _candidate) public view returns (uint256) {
        return votes[_candidate];
    }

    function transferOwnership(address newOwner) public onlyOwner {
        owner = newOwner;
    }
}
