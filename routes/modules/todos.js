const express = require('express')
const router = express.Router()

const db = require('../../models') /////////////// 之後把這也殺了試試
const Todo = db.Todo
// const Todo = require('../../models/todo') // 不能替代

router.get('/new', (req, res) => {
  return res.render('new')
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findByPk(id)
    .then(todo => res.render('detail', { todo: todo.toJSON() }))
    .catch(error => console.log(error))
})

module.exports = router
