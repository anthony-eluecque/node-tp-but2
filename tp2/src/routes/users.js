const { Router } = require('express');
const createUser = require('../controllers/createUser');
const router = Router();
const express = require('express');
const getAllUsers = require('../controllers/getAllUsers');
const getWatchlistsUser = require('../controllers/getWatchlistsUser');

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get('/',getAllUsers);
router.post('/create',createUser);
router.get('/user/watchlists',getWatchlistsUser);

module.exports = router;