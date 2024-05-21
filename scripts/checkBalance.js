// scripts/checkBalance.js
async function main() {
  const [deployer] = await ethers.getSigners();
  const balance = await deployer.getBalance();
  console.log("Account balance:", ethers.utils.formatEther(balance));
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
