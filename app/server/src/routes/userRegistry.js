module.exports = (userRegistryContract) => {
  const express = require('express');
  const router = express.Router();

  router.post('/register', async (req, res) => {
      try {
          const { name } = req.body;
          const tx = await userRegistryContract.register(name);
          await tx.wait();
          res.json({ message: 'User registered successfully' });
      } catch (error) {
          res.status(500).json({ error: error.message });
      }
  });

  return router;
};
