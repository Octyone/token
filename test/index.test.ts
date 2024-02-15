import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ContractFactory } from "ethers";
import { describe, test } from "mocha";
import { strictEqual } from "node:assert";
import { Octy as OctyContract } from "../typechain-types/contracts/Octy";

// @ts-ignore
import { ethers } from "hardhat";

async function deploy() {
  const [owner, otherAccount] = await ethers.getSigners();
  const Octy: ContractFactory = await ethers.getContractFactory("Octy");
  const octy = (await Octy.deploy()) as OctyContract;
  const initAmount = 1000n * 10n ** 18n;
  await octy.mint(owner.address, initAmount);
  await octy.mint(otherAccount.address, initAmount);
  return {
    owner,
    otherAccount,
    initAmount,
    octy,
  };
}

describe("octy test", () => {
  test("should be right name and symbol", async () => {
    const { octy } = await loadFixture(deploy);
    strictEqual(await octy.name(), "Octy", "name is not right");
    strictEqual(await octy.symbol(), "OCTY", "symbol is not right");
  });
  test("should be right decimals", async () => {
    const { octy } = await loadFixture(deploy);
    strictEqual(await octy.decimals(), 18n, "decimals is not right");
  });
  test("should be mint right amount", async () => {
    const { owner, otherAccount, initAmount, octy } = await loadFixture(deploy);
    const ownerTokenBalance = await octy.balanceOf(owner.address);
    const otherTokenBalance = await octy.balanceOf(otherAccount.address);
    strictEqual(
      ownerTokenBalance.toString(),
      initAmount.toString(),
      "owner balance is not right",
    );
    strictEqual(
      otherTokenBalance.toString(),
      initAmount.toString(),
      "other balance is not right",
    );
  });
});
