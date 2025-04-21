import { envs } from '../../config/envs'

export class DiscordService {
  private readonly discordWebhookUrl = envs.DISCORD_WEBHOOK_URL

  async notify (message: string): Promise<boolean> {
    const body = {
      content: message,
      embeds: [
        {
          image: {
            url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnl1MXF2d2wwZ2JlOHQ1M2I2bTIycmY2ZGg3NHNpeXFxY3VwZ2ozciZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xku8a1Q2o6UeO3ugPL/giphy.gif'
          }
        }
      ]
    }

    const response = await fetch(this.discordWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    if (!response.ok) {
      throw new Error('Discord webhook failed')
    }

    return true
  }
}
