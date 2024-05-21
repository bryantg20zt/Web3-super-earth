import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import DonationABI from './abis/Donation.json';
import UserRegistryABI from './abis/UserRegistry.json';
import RewardsABI from './abis/Rewards.json';

const donationAddress = import.meta.env.VITE_URL_DONATION;
const userRegistryAddress = import.meta.env.VITE_URL_REGISTRY;
const rewardsAddress = import.meta.env.VITE_URL_REWARDS;

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [donationContract, setDonationContract] = useState(null);
  const [userRegistryContract, setUserRegistryContract] = useState(null);
  const [rewardsContract, setRewardsContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [name, setName] = useState('');
  const [donationMessage, setDonationMessage] = useState('');

  useEffect(() => {
      const init = async () => {
          try {
              const web3Modal = new Web3Modal();
              const connection = await web3Modal.connect();
              const web3Provider = new ethers.providers.Web3Provider(connection);
              setProvider(web3Provider);

              const web3Signer = web3Provider.getSigner();
              setSigner(web3Signer);

              const donation = new ethers.Contract(donationAddress, DonationABI, web3Signer);
              setDonationContract(donation);

              const userRegistry = new ethers.Contract(userRegistryAddress, UserRegistryABI, web3Signer);
              setUserRegistryContract(userRegistry);

              const rewards = new ethers.Contract(rewardsAddress, RewardsABI, web3Signer);
              setRewardsContract(rewards);

              const userAccount = await web3Signer.getAddress();
              setAccount(userAccount);
          } catch (error) {
              console.error("Error initializing provider:", error);
          }
      };

      init();
  }, []);

  const registerUser = async () => {
      if (userRegistryContract) {
          const tx = await userRegistryContract.register(name);
          await tx.wait();
          alert('User registered successfully');
      }
  };

  const donate = async () => {
      if (donationContract) {
          const tx = await donationContract.donate({ value: ethers.utils.parseEther('0.001') });
          await tx.wait();
          setDonationMessage('Donation successful!');
      }
  };

  const claimReward = async () => {
      if (rewardsContract) {
          const tx = await rewardsContract.claimReward();
          await tx.wait();
          alert('Reward claimed successfully!');
      }
  };

  return (
      <div>
          <h1>Helldivers Bank</h1>
          <div>
              <h2>Register</h2>
              <input type="text" placeholder="Enter your name" onChange={(e) => setName(e.target.value)} />
              <button onClick={registerUser}>Register</button>
          </div>
          <div>
              <h2>Donate</h2>
              <button onClick={donate}>Donate 0.001 ETH</button>
              {donationMessage && <p>{donationMessage}</p>}
          </div>
          <div>
              <h2>Claim Reward</h2>
              <button onClick={claimReward}>Claim Reward</button>
          </div>
      </div>
  );
}


export default App;
