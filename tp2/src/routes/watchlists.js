const { Router } = require('express');
const router = Router()
const express = require('express');
const { addItemToWatchlist } = require('../controllers/addItemToWatchlist');
const createWatchlist = require('../controllers/createWatchlist');

router.use(express.json());
router.use(express.urlencoded({ extended: false }))

router.post('/create',createWatchlist)
router.post('/add',addItemToWatchlist)

module.exports = router;