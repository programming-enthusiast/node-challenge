import Field from './fields.model.js'

const createField = (req, res) => {
  Field
    .create(req.body)
    .then(field => res.json(field))
    .catch(err => next(err))
}

const getFields = (req, res) => {
  Field
    .find()
    .then(fields => res.json(fields))
    .catch(err => next(err))
}

export default {
  createField,
  getFields,
}
