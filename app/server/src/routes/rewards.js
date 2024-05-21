module.exports = (rewardsContract) => {
  const express = require('express');
  const router = express.Router();

  router.post('/claim', async (req, res) => {
      try {
          const tx = await rewardsContract.claimReward();
          await tx.wait();
          res.json({ message: 'Reward claimed successfully' });
      } catch (error) {
          res.status(500).json({ error: error.message });
      }
  });

  return router;
};
