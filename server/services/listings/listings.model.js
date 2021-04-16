import mongoose from 'mongoose'
const { model, Schema } = mongoose

export const ModelName = 'Listing'

const ListingSchema = new Schema({
  address: { type: String, required: true },
  stateCode: { type: String, required: true }, // AL, NY, NC, etc.
  listingService: { type: Schema.Types.ObjectId, ref: 'ListingService' },
  price: { type: Number, default: 0 },
  commission: { type: Number, default: 2 },
  lotSize: { type: Number, default: 1 }, // acres
  bed: { type: Number, default: 1 },
  bath: { type: Number, default: 1 },
  fields: [{
    field: { type: Schema.Types.ObjectId, ref: 'Field' },
    value: { type: String, default: ''}
  }]
})

const Listing = model('Listing', ListingSchema)

export default Listing
