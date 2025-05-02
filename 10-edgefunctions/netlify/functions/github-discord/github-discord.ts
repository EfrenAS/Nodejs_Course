import { Handler } from '@netlify/functions'

const GITHUB_EVENTS = {
  STAR: 'star',
  ISSUES: 'issues'
}

const onStar = (payload: any): string => {
  const { action, repository, sender } = payload

  return `Received ${action} event for ${repository.full_name} by ${sender.login}`
}

const onIssue = (payload: any): string => {
  const { action, issue } = payload

  if (action === 'opened') {
    return `An issue was opened with this title: ${issue.title}`
  }

  if (action === 'closed') {
    return `An issue was closed by ${issue.user.login}`
  }

  if (action === 'reopened') {
    return `An issue was reopened by ${issue.user.login}`
  }

  return `Unhandler action for this issue: ${action}`
}

const notify = async (message: string): Promise<boolean> => {
  const body = {
    content: message
  }

  const response = await fetch(process.env.DISCORD_WEBHOOK_URL ?? '', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  if (!response.ok) {
    console.log('Error sending message to discord')
    return true
  }

  return false
}

export const handler: Handler = async (event, context) => {
  const githubEvent = event.headers['x-github-event'] ?? 'uknown'
  const payload = JSON.parse(event.body ?? '{}')
  let message: string = ''

  if (githubEvent === 'uknown') {
    console.log('Uknown event')
    return
  }
  if (githubEvent === GITHUB_EVENTS.STAR) {
    message = onStar(payload)
  }

  if (githubEvent === GITHUB_EVENTS.ISSUES) {
    message = onIssue(payload)
  }

  await notify(message)

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Done' }),
    headers: {
      'Content-Type': 'application/json'
    }
  }
}
