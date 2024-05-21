// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./UserRegistry.sol";

contract Rewards {
    UserRegistry public userRegistry;

    event RewardClaimed(address user, string reward);

    constructor(address userRegistryAddress) {
        userRegistry = UserRegistry(userRegistryAddress);
    }

    function claimReward() public {
        (, uint donationCount) = userRegistry.getUser(msg.sender);
        require(donationCount > 0, "No donations made");
        emit RewardClaimed(msg.sender, "You have received a Helldiver Badge!");
    }
}
