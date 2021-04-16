import mongoose from 'mongoose'
const { model, Schema } = mongoose

export const ModelName = 'User'

const UserSchema = new Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin', 'broker'], required: true, default: 'user'}
})

const User = model('User', UserSchema)

export default User
