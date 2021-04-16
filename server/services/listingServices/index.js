import express from 'express'
import controller from './listingServices.controller.js'

const listingServicesRouter = express.Router()

listingServicesRouter.post('/', controller.createListingService)
listingServicesRouter.get('/', controller.getAllListingServices)
listingServicesRouter.get('/:id', controller.getListingService)
listingServicesRouter.delete('/:id', controller.deleteListingService)
listingServicesRouter.put('/:id', controller.updateListingService)

export default listingServicesRouter
