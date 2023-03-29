const { Router } = require('express');
const router = Router();
const express = require('express');
const { addItemToWatchlist } = require('../controllers/addItemToWatchlist');
const createWatchlist = require('../controllers/createWatchlist');
const deleteItem = require('../controllers/deleteItem');
const editStateOfItem = require('../controllers/editStateOfItem');
const getItemsWatchlists = require('../controllers/getItemsWatchlists');

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post('/create',createWatchlist);
router.post('/add',addItemToWatchlist);
router.post('/edit',editStateOfItem);
router.get('/watchlist/items',getItemsWatchlists);
router.delete('/delete',deleteItem)

module.exports = router;