const { Router } = require('express');
const createUser = require('../controllers/createUser');
const router = Router()



router.get('/create',createUser)

module.exports = router;