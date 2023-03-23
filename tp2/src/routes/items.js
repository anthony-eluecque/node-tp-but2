const { Router } = require('express');
const addItem = require('../controllers/addItem.js');
const router = Router()
const express = require('express')

router.use(express.json());
router.use(express.urlencoded({ extended: false }))

router.post('/add',addItem);


module.exports = router;
