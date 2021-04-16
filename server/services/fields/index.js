import express from 'express'
import controller from './fields.controller.js'

const fieldsRouter = express.Router()

fieldsRouter.get('/', controller.getFields)
fieldsRouter.post('/', controller.createField)

export default fieldsRouter
