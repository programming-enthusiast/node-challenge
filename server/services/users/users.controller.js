import User from './users.model.js'

const createUser = (req, res) => {
  User
    .create(req.body)
    .then(user => res.json(user))
    .catch(err => next(err))
}

const getUser = (req, res) => {
  User
    .findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => next(err))
}

const getAllUsers = (req, res) => {
  User
    .find()
    .then(users => res.json(users))
    .catch(err => next(err))
}

const updateUser = (req, res) => {
  User
    .findByIdAndUpdate(req.params.id, req.body)
    .then(users => res.json(users))
    .catch(err => next(err))
}

const deleteUser = (req, res) => {
  User
    .findByIdAndRemove(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(err => next(err))
}

export default {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
}
