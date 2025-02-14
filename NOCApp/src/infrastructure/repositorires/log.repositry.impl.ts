import { LogEntity, LogLevel } from '../../domain/entities/log.entity'
import { LogRepository } from '../../domain/repository/log.repository'
import { LogDatasource } from '../../domain/datasources/log.datasource'

export class LogRepositoryImpl implements LogRepository {
  constructor (
    private readonly logDatasource: LogDatasource
  ) {}

  async saveLog (log: LogEntity): Promise<void> {
    return await this.logDatasource.saveLog(log)
  }

  async getLogs (severityLevel: LogLevel): Promise<LogEntity[]> {
    return await this.logDatasource.getLogs(severityLevel)
  }
}
