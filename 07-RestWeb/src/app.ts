import { envs } from './config/envs'
import { Server } from './presentation/server'
import { Routes } from './presentation/routes'


(
  async () => {
    main()
  }
)()

async function main() {
  const server = new Server({
    routes: Routes.routes,
    port: envs.PORT,
    publicPath: envs.PUBLIC_PATH
  })
  server.start()
}