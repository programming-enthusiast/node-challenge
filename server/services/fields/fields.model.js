import mongoose from 'mongoose'
const { model, Schema } = mongoose

export const ModelName = 'Field'

const FieldSchema = new Schema({
  name: { type: String, required: true },
  label: { type: String, required: true },
  type: { type: String, enum: ['text', 'number'], default: 'text' },
  isCoreField: { type: Boolean, default: false }
})

const Field = model('Field', FieldSchema)

export default Field
