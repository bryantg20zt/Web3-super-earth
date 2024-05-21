// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Donation {
    address public owner;
    uint public totalDonations;
    uint public donationCount;

    event DonationReceived(address indexed donor, uint amount);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    function donate() public payable {
        require(msg.value == 0.001 ether, "You must send exactly 0.001 ETH");
        totalDonations += msg.value;
        donationCount += 1;
        emit DonationReceived(msg.sender, msg.value);
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function withdraw() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
}
