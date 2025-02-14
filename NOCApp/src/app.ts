import { MongoDatabase } from './data/mongo/init'

import { envPlugin } from './config/plugins/env.plugin'
import { server } from './presentation/server'

void (async (): Promise<void> => {
  await main()
})()

async function main (): Promise<void> {
  await MongoDatabase.connect({
    mongoUrl: envPlugin.MONGO_URL,
    dbName: envPlugin.MONGO_DB_NAME
  })

  await server.start()
}
