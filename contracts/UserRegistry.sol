// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Donation.sol";

contract UserRegistry {
    struct User {
        string name;
        uint donationCount;
    }

    Donation public donationContract;
    mapping(address => User) public users;

    event UserRegistered(address user, string name);

    constructor(address donationContractAddress) {
        donationContract = Donation(donationContractAddress);
    }

    function register(string memory name) public {
        require(bytes(users[msg.sender].name).length == 0, "User already registered");
        users[msg.sender] = User(name, 0);
        emit UserRegistered(msg.sender, name);
    }

    function recordDonation(address donor) external {
        require(msg.sender == address(donationContract), "Only the donation contract can call this function");
        require(bytes(users[donor].name).length > 0, "User not registered");
        users[donor].donationCount += 1;
    }

    function getUser(address userAddress) external view returns (string memory, uint) {
        User memory user = users[userAddress];
        return (user.name, user.donationCount);
    }
}
