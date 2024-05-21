// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Store {
    address public owner;
    mapping(string => uint128) public stock;

    event ItemBought(address indexed buyer, string item, uint256 quantity);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addStock(string memory _item, uint128 _quantity) public onlyOwner {
        stock[_item] += _quantity;
    }

    function buyItem(string memory _item, uint128 _quantity) public payable {
        require(stock[_item] >= _quantity, "Not enough stock");
        uint128 totalPrice = 10; // Placeholder, as prices mapping has been removed
        require(msg.value >= totalPrice * _quantity, "Not enough Ether sent");
        stock[_item] -= _quantity;
        emit ItemBought(msg.sender, _item, _quantity);
    }

    function withdraw() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
}
