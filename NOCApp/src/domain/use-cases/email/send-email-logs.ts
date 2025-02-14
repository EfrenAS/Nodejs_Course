import { LogRepository } from '../../repository/log.repository'
import { EmailService } from '../../../presentation/email/email.service'
import { LogEntity, LogLevel } from '../../entities/log.entity'

interface SendEmailLogsUseCase {
  execute: (to: string | string[]) => Promise<boolean>
}

export class SendEmailLogs implements SendEmailLogsUseCase {
  constructor (
    private readonly logRepository: LogRepository,
    private readonly emailService: EmailService
  ) {}

  async execute (to: string | string[]): Promise<boolean> {
    try {
      const isSendEmail = await this.emailService.sendEmailWithFileSystemLogs(to)

      if (!isSendEmail) {
        throw new Error('Error on send email with file system logs')
      }

      const log = new LogEntity({
        message: 'Send email with file system logs',
        level: LogLevel.LOW,
        origin: 'send-email-logs.ts'
      })

      await this.logRepository.saveLog(log)

      return true
    } catch (error) {
      if (error instanceof Error) {
        const log = new LogEntity({
          message: error.message,
          level: LogLevel.HIGH,
          origin: 'send-email-logs.ts'
        })

        await this.logRepository.saveLog(log)
      }

      return false
    }
  }
}
