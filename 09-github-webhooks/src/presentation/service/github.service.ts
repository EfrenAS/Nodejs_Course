import { GitHubIssueInterface } from '../../interfaces/github-issue.interface'
import { GitHubStartInterface } from '../../interfaces/github-start.interface'

export class GithubService {
  onStar (payload: GitHubStartInterface): string {
    const { action, repository, sender } = payload

    return `Received ${action} event for ${repository.full_name} by ${sender.login}`
  }

  onIssue (payload: GitHubIssueInterface): string {
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
}
