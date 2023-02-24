const express = require('express')
const router = express.Router()

const db = require('../../models') /////////////// 之後把這也殺了試試
const Todo = db.Todo
// const Todo = require('../../models/todo') // 不能替代

router.get('/new', (req, res) => {
  return res.render('new')
})

// 我亂寫的 (加新 record)
router.post('/', (req, res) => {
  // console.log('這是req.user.id')
  // console.log('這是req.user.id')
  // console.log('這是req.user.id')
  // console.log(req.user.id)
  // console.log('這是req.user.id data-type')
  // console.log(typeof req.user.id)
  const UserId = req.user.id ///// 改了點，不知有無問題 -> 幹！ 不是 userId，是 UserId！！
  // const userId = req.user._id
  const name = req.body.name

  return Todo.create({ name, UserId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findByPk(id)
    .then(todo => res.render('detail', { todo: todo.toJSON() }))
    .catch(error => console.log(error))
})

// 編輯 todo
router.get('/:id/edit', (req, res) => {
  const UserId = req.user.id
  const id = req.params.id
  return Todo.findOne({ where: { id, UserId } })
    .then(todo => {
      todo = todo.toJSON()
      // console.log(todo.toJSON())
      return res.render('edit', { todo })
    })
    .catch(error => console.log(error))
})

// 送出 todo 更新
router.put('/:id', (req, res) => {
  const UserId = req.user.id
  const id = req.params.id
  const { name, isDone } = req.body

  return Todo.findOne({ where: { id, UserId } })
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})

// 刪除 todo
router.delete('/:id', (req, res) => {
  const UserId = req.user.id
  const id = req.params.id
  return Todo.findOne({ where: { id, UserId } })
    .then(todo => todo.destroy())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
