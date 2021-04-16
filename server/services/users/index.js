import express from 'express'
import controller from './users.controller.js'

const usersRouter = express.Router()

usersRouter.post('/', controller.createUser)
usersRouter.get('/', controller.getAllUsers)
usersRouter.get('/:id', controller.getUser)
usersRouter.delete('/:id', controller.deleteUser)
usersRouter.put('/:id', controller.updateUser)

export default usersRouter
