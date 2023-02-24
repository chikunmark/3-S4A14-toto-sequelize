const express = require('express')
const router = express.Router()

const db = require('../../models') /////////////// 之後把這也殺了試試
const Todo = db.Todo
const User = db.User

router.get('/', (req, res) => {
  const UserId = req.user.id // 這是猜的，不一定對 -> 結果對了...
  return Todo.findAll({ raw: true, nest: true, where: { UserId } })
    .then(todos => res.render('index', { todos: todos }))
    .catch(error => res.status(422).json(error))
})

module.exports = router
