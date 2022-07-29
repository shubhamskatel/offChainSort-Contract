//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract SortArray {
    uint256[] unsortedArray; // Contains unsorted array
    uint256[] sortedArray; // Contains unsorted array

    // Returns unsorted array
    event Sort(uint256[] array);

    // Function adds element to an unsorted array
    function addElement(uint256 _element) public {
        unsortedArray.push(_element);
    }

    // Emits function to sort off-chain
    function sortOffChain() public {
        emit Sort(unsortedArray);
    }

    // Function updates sorted array
    function addSortedData(uint256[] memory _sortedData) public {
        sortedArray = _sortedData;
    }

    // Returns Unsorted array
    function getUnsortedArray() public view returns (uint256[] memory) {
        return unsortedArray;
    }

    // Returns Sorted array
    function getSortedArray() public view returns (uint256[] memory) {
        return sortedArray;
    }
}
