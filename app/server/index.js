const express = require('express');
const cors = require('cors');
const { ethers } = require('ethers');
const DonationJSON = require('./src/abis/Donation.json');
const UserRegistryJSON = require('./src/abis/UserRegistry.json');
const RewardsJSON = require('./src/abis/Rewards.json');
require('dotenv').config();

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// Initialize provider and contracts
const provider = new ethers.providers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`);
let wallet;

try {
  wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
} catch (error) {
  console.error('Error: Invalid PRIVATE_KEY');
  process.exit(1);
}

const donationContract = new ethers.Contract(process.env.DONATION_ADDRESS, DonationJSON.abi, wallet);
const userRegistryContract = new ethers.Contract(process.env.USER_REGISTRY_ADDRESS, UserRegistryJSON.abi, wallet);
const rewardsContract = new ethers.Contract(process.env.REWARDS_ADDRESS, RewardsJSON.abi, wallet);

// Route to get the balance of the donation contract
app.get('/donation/balance', async (req, res) => {
  try {
      const balance = await donationContract.getBalance();
      res.json({ balance: balance.toString() });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching the balance' });
  }
});

// Donation endpoint
app.post('/donate', async (req, res) => {
  try {
    const tx = await donationContract.donate({ value: ethers.utils.parseEther('0.001') });
    await tx.wait();
    res.json({ message: 'Donation successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/claim', async (req, res) => {
  try {
      const tx = await rewardsContract.claimReward();
      await tx.wait();
      res.json({ message: 'Reward claimed successfully' });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Register endpoint with user existence check
app.post('/register', async (req, res) => {
  try {
    const { name, address } = req.body; // Assuming the user address is passed in the request body
    // Check if the user is already registered
    const userData = await userRegistryContract.getUser('0x3F4B465aC9227b21dDD754F42c522f094798D2EE');
    if (userData[0] !== '') {
      return res.status(400).json({ error: 'User already registered' });
    }
    // Register the user if not already registered
    const tx = await userRegistryContract.register(name);
    await tx.wait();
    res.json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/user/:address', async (req, res) => {
  try {
      const userAddress = req.params.address;
      // Llamada a la función 'getUser' del contrato 'UserRegistry'
      const userData = await userRegistryContract.getUser(userAddress);
      const name = userData[0];
      const donationCount = userData[1].toNumber();
      res.json({ name, donationCount });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Rewards endpoint
app.post('/rewards/claim', async (req, res) => {
  console.log('Buscando recompensa')
  try {
      const tx = await rewardsContract.claimReward();
      await tx.wait();
      res.json({ message: 'Reward claimed successfully' });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
