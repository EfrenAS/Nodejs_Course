import express from 'express'
import { envs } from './config/envs'

import { GithubController } from './presentation/github/controller'
import { GitHubSHA256Middleware } from './presentation/middlewares/gitHub-sha256.middleware'
void (
  () => main()
)()

function main (): void {
  const app = express()
  const controller = new GithubController()

  app.use(express.json())
  app.use(GitHubSHA256Middleware.verifyGitHubSignature)
  app.post('/api/github', controller.webHookHandler)

  app.listen(envs.PORT, () => console.log(`Listening on port ${envs.PORT}`))
}
