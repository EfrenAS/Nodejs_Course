import { LogRepository } from '../../repository/log.repository'
import { LogEntity, LogLevel } from '../../entities/log.entity'

interface CheckServiceUseCase {
  execute: (url: string) => Promise<boolean>
}

type SuccessCallback = (() => void) | undefined
type ErrorCallback = ((error: string) => void) | undefined

export class CheckService implements CheckServiceUseCase {
  constructor (
    private readonly logRepository: LogRepository,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  async execute (url: string): Promise<boolean> {
    try {
      const req = await fetch(url)

      if (!req.ok) {
        throw new Error(`Erro on check service ${url}`)
      }

      this.successCallback?.()

      const log = new LogEntity({
        message: `Check service ${url} is ok`,
        level: LogLevel.LOW,
        origin: 'check-service.ts'
      })

      await this.logRepository.saveLog(log)

      return true
    } catch (error) {
      if (error instanceof Error) {
        this.errorCallback?.(error.message)

        const errorMessage = `${error.message}`
        const log = new LogEntity({
          message: errorMessage,
          level: LogLevel.HIGH,
          origin: 'check-service.ts'
        })

        await this.logRepository.saveLog(log)
      }

      return false
    }
  }
}
