import { SortArray, SortArray__factory } from "../typechain";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { ethers } from "hardhat";

let sort: SortArray;
let owner: SignerWithAddress;

async function main() {
  [owner] = await ethers.getSigners();

  sort = await new SortArray__factory(owner).deploy();

  console.log(`Sort Contract deployed at: ${sort.address} `);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
//npx hardhat run --network testnet scripts/deploy.ts
