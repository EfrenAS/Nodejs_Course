import { Server } from '../src/presentation/server'
import { Routes } from '../src/presentation/routes'
import { envs } from '../src/config/envs'

export const testServer = new Server ({
  port: envs.PORT,
  publicPath: envs.PUBLIC_PATH,
  routes: Routes.routes
})
