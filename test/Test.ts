import { SortArray, SortArray__factory } from "../typechain";

import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { ethers } from "hardhat";
import { expect } from "chai";

describe("Sort Test", async () => {
  let owner: SignerWithAddress;
  let sort: SortArray;

  beforeEach(async () => {
    [owner] = await ethers.getSigners();

    sort = await new SortArray__factory(owner).deploy();
    await sort.addElement(5);
    await sort.addElement(8);
    await sort.addElement(3);
    await sort.addElement(9);
  });

  function getArray(arr: any) {
    let array: any = [];

    for (var i = 0; i < arr.length; i++) {
      array.push(arr[i].toString());
    }
    return array;
  }

  it("Event get", async () => {
    let data = await sort.sortOffChain();
    let receipt = await data.wait();
    let finalEvent = receipt.events?.find((event) => event.event === "Sort");
    let unsortedArray: any = getArray(
      finalEvent?.args ? finalEvent.args[0] : ""
    );

    console.log("Unsorted Array: ", unsortedArray);

    const sortedArray = unsortedArray.sort((n1: number, n2: number) => n1 - n2);
    console.log("Sorted Array: ", sortedArray);

    console.log(
      "Previous Sorted array in contract: ",
      await sort.getSortedArray()
    );

    await sort.addSortedData(sortedArray);

    let sortedArrayFinal = getArray(await sort.getSortedArray());
    console.log("New Sorted array in contract: ", sortedArrayFinal);

    expect(sortedArrayFinal.toString()).to.be.eq("3,5,8,9");
  });
});
