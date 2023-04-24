import mongoose from 'mongoose'

const TakSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enums: ['default' , 'sport' , 'shopping' , 'wishlist' , 'work'],
    default: 'default'
  },
  status: {
    type: String,
    enums: ['pending' , 'completed'],
    default: 'pending'
  },
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true
  }
  }, {timestamps: true})

export default mongoose.model('Task', TakSchema)