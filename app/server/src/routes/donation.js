module.exports = (donationContract) => {
  const express = require('express');
  const router = express.Router();

  router.post('/donate', async (req, res) => {
      try {
          const tx = await donationContract.donate({ value: ethers.utils.parseEther('0.001') });
          await tx.wait();
          res.json({ message: 'Donation successful' });
      } catch (error) {
          res.status(500).json({ error: error.message });
      }
  });

  return router;
};
