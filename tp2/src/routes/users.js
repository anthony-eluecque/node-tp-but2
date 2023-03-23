const { Router } = require('express');
const createUser = require('../controllers/createUser');
const router = Router()
const express = require('express')

router.use(express.json());
router.use(express.urlencoded({ extended: false }))


router.post('/create',createUser)

module.exports = router;