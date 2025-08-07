const express = require('express');
const router = express.Router();

// Predefined categories and their options
const categories = {
  "IT": {
    jobTitles: [
      "Software Engineer",
      "Data Analyst",
      "DevOps Engineer",
      "UI/UX Designer",
      "IT Support Specialist",
      "Cloud Architect"
    ],
    companies: [
      "TCS",
      "Infosys",
      "Wipro",
      "Google",
      "Amazon",
      "Microsoft",
      "Zoho",
      "HCL"
    ]
  },
  "Central Govt": {
    jobTitles: [
      "Administrative Officer",
      "Tax Inspector",
      "Banking Officer",
      "Railway Officer",
      "Defense Personnel",
      "Public Sector Officer"
    ],
    companies: [
      "Indian Railways",
      "State Bank of India",
      "Reserve Bank of India",
      "Defense Ministry",
      "Finance Ministry",
      "UPSC"
    ]
  },
  "State Govt": {
    jobTitles: [
      "State Administrative Officer",
      "Police Officer",
      "State Bank Clerk",
      "State Teacher",
      "State Health Worker",
      "State Transport Officer"
    ],
    companies: [
      "State Public Service Commission",
      "State Police Department",
      "State Education Board",
      "State Health Department",
      "State Transport Corporation",
      "State Electricity Board"
    ]
  }
};

// Get all categories
router.get('/', (req, res) => {
  res.json(Object.keys(categories));
});

// Get options for a specific category
router.get('/:category', (req, res) => {
  const category = req.params.category;
  if (categories[category]) {
    res.json(categories[category]);
  } else {
    res.status(404).json({ message: 'Category not found' });
  }
});

module.exports = router;