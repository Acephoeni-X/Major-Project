// SPDX-License-Identifier: MIT
// pragma solidity 0.8.17;

contract EtherTransfer {
    struct Transaction {
        address from;
        address to;
        uint256 amount;
        string message;
    }

    mapping(uint256 => Transaction) private transactions;
    uint256 private transactionCount;

    constructor() {
        transactionCount = 0;
    }

    function transferEther(
        address payable _to,
        uint256 _amount,
        string memory _message
    ) public payable {
        require(msg.value == _amount, "Amount should be equal to msg.value");
        require(
            address(this).balance >= _amount,
            "Contract doesn't have enough balance to transfer"
        );

        _to.transfer(_amount);
        transactions[transactionCount] = Transaction(
            msg.sender,
            _to,
            _amount,
            _message
        );
        transactionCount++;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }

    function getTransaction(
        uint256 _index
    ) public view returns (address, address, uint256, string memory) {
        require(_index < transactionCount, "Invalid index");

        Transaction memory transaction = transactions[_index];
        return (
            transaction.from,
            transaction.to,
            transaction.amount,
            transaction.message
        );
    }
}
