import mongoose from 'mongoose'
import config from 'config'
import logger from './logger'

const ca = 'config/X509-cert.pem'

const options: mongoose.ConnectOptions = {
  sslKey: ca,
  sslCert: ca,
  serverSelectionTimeoutMS: 1000
}

// with the use of this interface an option is given to choose if the app terminates when the connection doesnt happen
// usefull during development
interface AppDatabaseConnectionOptions {
  exitOnFailure?: boolean;
}

async function connect (connectionOptions: AppDatabaseConnectionOptions = {}) {
  const dbUri = config.get<string>('dbUri')

  try {
    await mongoose.connect(dbUri, options)
    logger.info('Connected to MongoDB Atlas!')
  } catch (error) {
    logger.error('Could not connect to MongoDB Atlas')
    // this is used with to indicate that an error occurred
    // usually theres an exit code of 0
    if (connectionOptions.exitOnFailure ?? true) process.exit(1);
  }
}

export default connect
