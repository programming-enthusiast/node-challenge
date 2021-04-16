import express from 'express'
import controller from './listings.controller.js'

const listingsRouter = express.Router()

listingsRouter.post('/', controller.createListing)
listingsRouter.get('/', controller.getAllListings)
listingsRouter.get('/:id', controller.getListing)
listingsRouter.delete('/:id', controller.deleteListing)
listingsRouter.put('/:id', controller.updateListing)

export default listingsRouter
