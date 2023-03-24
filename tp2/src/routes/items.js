const { Router } = require('express');
const router = Router();
const express = require('express');
const createItem = require('../controllers/createItem.js');

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post('/add',createItem);


module.exports = router;
