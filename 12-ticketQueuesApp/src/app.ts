import { createServer } from 'node:http'
import { envs } from './config/envs'
import { AppRoutes } from './presentation/routes'
import { Server } from './presentation/server'
import { WssService } from './presentation/services/wss.service'

void (async () => {
  await main()
})()

async function main (): Promise<void> {
  const server = new Server({
    port: envs.PORT
  })

  const httpServer = createServer(server.app)
  WssService.inittWss({ server: httpServer })

  server.setRoutes(AppRoutes.routes)
  httpServer.listen(envs.PORT, () => console.log(`Server running on port: ${envs.PORT}`))
}
