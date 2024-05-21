async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Deploy Donation contract
  const Donation = await ethers.getContractFactory("Donation");
  const donation = await Donation.deploy();
  await donation.deployed();
  console.log("Donation contract deployed to:", donation.address);

  // Deploy UserRegistry contract
  const UserRegistry = await ethers.getContractFactory("UserRegistry");
  const userRegistry = await UserRegistry.deploy(donation.address);
  await userRegistry.deployed();
  console.log("UserRegistry contract deployed to:", userRegistry.address);

  // Deploy Rewards contract
  const Rewards = await ethers.getContractFactory("Rewards");
  const rewards = await Rewards.deploy(userRegistry.address);
  await rewards.deployed();
  console.log("Rewards contract deployed to:", rewards.address);

  console.log("All contracts deployed and linked successfully!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
