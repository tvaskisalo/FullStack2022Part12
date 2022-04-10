const express = require('express');
const { Todo } = require('../mongo')
const { getAsync, setAsync} = require('../redis')
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  let n = await getAsync('count')
  if (!n) n = 0
  n = parseInt(n)
  await setAsync('count', n+1)
  console.log(await getAsync('count'))
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo)
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const { text, done } = req.body
  const { id } = req.params
  const todoUpdated = await Todo.findOneAndUpdate({id}, {text, done})
  res.send({id, text, done})
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
