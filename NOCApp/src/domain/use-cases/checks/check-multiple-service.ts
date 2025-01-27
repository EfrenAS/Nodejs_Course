import { LogRepository } from '../../repository/log.repository'
import { LogEntity, LogLevel } from '../../entities/log.entity'

interface CheckMultipleServiceUseCase {
  execute: (url: string) => Promise<boolean>
}

type SuccessCallback = (() => void) | undefined
type ErrorCallback = ((error: string) => void) | undefined

export class CheckMultipleService implements CheckMultipleServiceUseCase {
  constructor (
    private readonly logRepository: LogRepository[],
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  async callMultipleRepositories (log: LogEntity): Promise<void> {
    this.logRepository.forEach(async (repository) => {
      await repository.saveLog(log)
    })
  }

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

      await this.callMultipleRepositories(log)

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

        await this.callMultipleRepositories(log)
      }

      return false
    }
  }
}
