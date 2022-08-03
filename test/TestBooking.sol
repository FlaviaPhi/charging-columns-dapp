pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/BookingColumns.sol";

contract TestBooking {
    //The address of the booking contract to be tested
    BookingColumns book = BookingColumns(DeployedAddresses.BookingColumns());

    //The id of the column that will be used for testing
    uint expectedColumnId = 8;

    //The expected user of booked column is this contract
    address expectedBooker = address(this);

    //Testing the booking() function
    function testUserCanBookColumn() public {
        uint returnedId = book.booking(expectedColumnId);

        Assert.equal(returnedId, expectedColumnId, "Booking of the expected column should match what is returned.");
        
    }

    //Testing retrieval of a single pet's owner
    function testGetBookerAddressByColumnId() public {
        address booker = book.bookers(expectedColumnId);

        Assert.equal(booker, expectedBooker, "User of the expected column should be this contract");
    }

    //Testing retrieval of all pet owners
    function testGetBookerAddressByColumnIdInArray() public {
        //Store bookers in memoy rather than contract's storage
        address[10] memory bookers = book.getBookers();

        Assert.equal(bookers[expectedColumnId], expectedBooker, "User of the expected column should be this contract.");
    }

    
}