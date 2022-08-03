pragma solidity ^0.5.0;

contract BookingColumns{
    address[10] public bookers; //array of ethereum addresses

    //We allow users to book a column
    function booking(uint columnId) public returns (uint) {
        require (columnId >=0 && columnId <=10);

        bookers[columnId] = msg.sender; //the address of the person or SC who call this function is denoted by msg.sender

        return columnId; //as confirmation
    }

    //Update all columns booking statuses
    function getBookers() public view returns (address[10] memory) {
        return bookers;
    }

}