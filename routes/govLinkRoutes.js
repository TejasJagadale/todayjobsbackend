const express = require('express');
const router = express.Router();
const GovLink = require('../models/GovLink');

// Similar CRUD operations as jobRoutes.js
// Create, Read, Update, Delete for government links

router.post('/', async (req, res) => {
  try {
    const link = new GovLink(req.body);
    await link.save();
    res.status(201).json(link);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const links = await GovLink.find();
    res.json(links);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add other CRUD operations as needed...

module.exports = router;