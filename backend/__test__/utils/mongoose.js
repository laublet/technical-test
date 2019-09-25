import mongoose from 'mongoose'
import constants from '@/config/constants'

export const connect = () => mongoose.connect(constants.MONGO_URL, { useNewUrlParser: true })

export const disconnect = () => mongoose.connection.close()
