// scripts/deployToken.js
async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying Token contract with the account:", deployer.address);

  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy(1000000);
  await token.deployed();
  console.log("Token deployed to:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
