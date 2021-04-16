import ListingService from './listingServices.model.js'

const createListingService = (req, res) => {
  ListingService
    .create(req.body)
    .then(listingService => res.json(listingService))
    .catch(err => next(err))
}

const getListingService = (req, res) => {
  ListingService
    .findById(req.params.id)
    .populate('fields.field')
    .then(listingService => res.json(listingService))
    .catch(err => next(err))
}

const getAllListingServices = (req, res) => {
  ListingService
    .find()
    .populate('fields.field')
    .then(listingServices => res.json(listingServices))
    .catch(err => next(err))
}

const updateListingService = (req, res) => {
  ListingService
    .findByIdAndUpdate(req.params.id, req.body)
    .then(listingService => res.json(listingService))
    .catch(err => next(err))
}

const deleteListingService = (req, res) => {
  ListingService
    .findByIdAndRemove(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(err => next(err))
}

export default {
  createListingService,
  getListingService,
  getAllListingServices,
  updateListingService,
  deleteListingService,
}
