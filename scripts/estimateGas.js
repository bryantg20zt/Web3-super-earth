async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Estimating gas costs with the account:", deployer.address);

  // Estimating gas for Donation contract
  const Donation = await ethers.getContractFactory("Donation");
  const donation = await Donation.deploy();
  const donationReceipt = await donation.deployTransaction.wait();
  console.log("Donation contract deployment gas used:", donationReceipt.gasUsed.toString());

  // Estimating gas for UserRegistry contract
  const UserRegistry = await ethers.getContractFactory("UserRegistry");
  const userRegistry = await UserRegistry.deploy(donation.address);
  const userRegistryReceipt = await userRegistry.deployTransaction.wait();
  console.log("UserRegistry contract deployment gas used:", userRegistryReceipt.gasUsed.toString());

  // Estimating gas for Rewards contract
  const Rewards = await ethers.getContractFactory("Rewards");
  const rewards = await Rewards.deploy(userRegistry.address);
  const rewardsReceipt = await rewards.deployTransaction.wait();
  console.log("Rewards contract deployment gas used:", rewardsReceipt.gasUsed.toString());

  // Summing up the total gas used
  const totalGasUsed = donationReceipt.gasUsed.add(userRegistryReceipt.gasUsed).add(rewardsReceipt.gasUsed);
  console.log("Total gas used for deployment:", totalGasUsed.toString());

  // Get current gas price
  const gasPrice = await ethers.provider.getGasPrice();
  console.log("Current gas price:", ethers.utils.formatUnits(gasPrice, "gwei"), "gwei");

  // Calculate total deployment cost in ETH
  const totalDeploymentCost = totalGasUsed.mul(gasPrice);
  console.log("Estimated total deployment cost in ETH:", ethers.utils.formatEther(totalDeploymentCost));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
