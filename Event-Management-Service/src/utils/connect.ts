import mongoose from 'mongoose'
import config from 'config'
import logger from './logger'

const ca = 'config/X509-cert.pem'

const options: mongoose.ConnectOptions = {
  sslKey: ca,
  sslCert: ca
}

async function connect () {
  const dbUri = config.get<string>('dbUri')

  try {
    await mongoose.connect(dbUri, options)
    logger.info('Connected to MongoDB Atlas!')
  } catch (error) {
    logger.error('Could not connect to MongoDB Atlas')
    process.exit(1)
  }
}

export default connect
