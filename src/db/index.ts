import mongoose, { ConnectOptions, Types } from 'mongoose'

class MongoClient {
  options: ConnectOptions

  constructor() {
    this.options = {
      // useUnifiedTopology: true,
      // useNewUrlParser: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
    }
  }

  initialize(): void {
    mongoose
      .connect(process.env.DB_URL, this.options)
      .then(() => global.log.info('Database connected'))
      .catch((error: Error) => {
        throw error
      })
  }

  mongify(id: string): Types.ObjectId {
    return new mongoose.Types.ObjectId(id)
  }

  isEqual(id1: string | Types.ObjectId | null, id2: string | Types.ObjectId | null): boolean {
    return (id1 ? id1.toString() : id1) === (id2 ? id2.toString() : id2)
  }
}

export default new MongoClient()
