const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const todos = require('./modules/todos')
const users = require('./modules/users')
// const auth = require('./modules/auth')

const { authenticator } = require('../middleware/auth')

// 條件由上往下比對，檔案由上往下讀，因此，條件最鬆的通常擺最下面
router.use('/todos', authenticator, todos)
router.use('/users', users)
// router.use('/auth', auth)
router.use('/', authenticator, home)

module.exports = router
