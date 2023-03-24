const { Router } = require('express');
const router = Router()
const express = require('express');
const { addItemToWatchlist } = require('../controllers/addItemToWatchlist');
const createWatchlist = require('../controllers/createWatchlist');
const editStateOfItem = require('../controllers/editStateOfItem');

router.use(express.json());
router.use(express.urlencoded({ extended: false }))

router.post('/create',createWatchlist)
router.post('/add',addItemToWatchlist)
router.post('/edit',editStateOfItem)

module.exports = router;