import { Request, Response } from 'express'
import { DiscordService } from '../service/discord.service'
import { GithubService } from '../service/github.service'

export class GithubController {
  constructor (
    public readonly githubService: GithubService = new GithubService(),
    public readonly discordService: DiscordService = new DiscordService()
  ) { }

  private readonly GITHUB_EVENTS = {
    STAR: 'star',
    ISSUES: 'issues'
  }

  public webHookHandler = (req: Request, res: Response): void => {
    const githubEvent = req.header('x-github-event') ?? 'uknown'
    const payload = req.body
    let message: string = ''

    if (githubEvent === 'uknown') {
      console.log('Uknown event')
      return
    }
    if (githubEvent === this.GITHUB_EVENTS.STAR) {
      message = this.githubService.onStar(payload)
    }

    if (githubEvent === this.GITHUB_EVENTS.ISSUES) {
      message = this.githubService.onIssue(payload)
    }

    this.discordService.notify(message)
      .then(() => res.status(202).send('Accepted'))
      .catch(() => res.status(500).send('Internal server error'))
  }
}
