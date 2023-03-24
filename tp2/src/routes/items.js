const { Router } = require('express');
const router = Router();
const express = require('express');
const createItem = require('../controllers/createItem.js');
const filterItems = require('../controllers/filterItems.js');

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post('/add',createItem);
router.get('/filter/',filterItems);


module.exports = router;
