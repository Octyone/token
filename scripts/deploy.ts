// @ts-ignore
import { ethers } from "hardhat";

async function main() {
  const octy = await ethers.deployContract("Octy");
  await octy.waitForDeployment();
  console.log("Octy deployed to", octy.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error("deploy error", error);
  process.exitCode = 1;
});
