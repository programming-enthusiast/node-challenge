import mongoose from 'mongoose'
const { model, Schema } = mongoose

export const ModelName = 'ListingService'

const ListingServiceSchema = new Schema({
  stateCode: { type: String, required: true }, // AL, NY, NC, etc.
  broker: { type: Schema.Types.ObjectId, ref: 'User' },
  feeToList: { type: Number } ,
  cancellationFee: { type: Number },
  fields: [{
    field: { type: Schema.Types.ObjectId, ref: 'Field'},
    descriptionText: { type: String, default: '' },
    group: { type: String, default: '' },
    active: { type: Boolean, default: true }
  }],
})

const ListingService = model('ListingService', ListingServiceSchema)

export default ListingService
