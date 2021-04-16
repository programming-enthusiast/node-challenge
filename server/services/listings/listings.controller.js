import Listing from './listings.model.js'

const createListing = (req, res) => {
  Listing
    .create(req.body)
    .then(listing => res.json(listing))
    .catch(err => next(err))
}

const getListing = (req, res) => {
  Listing
    .findById(req.params.id)
    .populate('fields.field')
    .populate({
      path: 'listingService',
      populate: {
        path: 'fields.field',
      }
    })
    .then(listing => res.json(listing))
    .catch(err => next(err))
}

const getAllListings = (req, res) => {
  Listing
    .find()
    .then(listings => res.json(listings))
    .catch(err => next(err))
}

const updateListing = (req, res) => {
  Listing
    .findByIdAndUpdate(req.params.id, req.body)
    .then(listing => res.json(listing))
    .catch(err => next(err))
}

const deleteListing = (req, res) => {
  Listing
    .findByIdAndRemove(req.params.id, req.body)
    .then(() => res.sendStatus(200))
    .catch(err => next(err))
}

export default {
  createListing,
  getListing,
  getAllListings,
  updateListing,
  deleteListing,
}
