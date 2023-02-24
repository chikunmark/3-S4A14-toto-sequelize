const express = require('express')
const router = express.Router()

const db = require('../../models') /////////////// 之後把這也殺了試試
const Todo = db.Todo

router.get('/', (req, res) => {
  return Todo.findAll({ raw: true, nest: true })
    .then(todos => {
      return res.render('index', { todos: todos })
    })
    .catch(error => {
      return res.status(422).json(error)
    })
})

module.exports = router
