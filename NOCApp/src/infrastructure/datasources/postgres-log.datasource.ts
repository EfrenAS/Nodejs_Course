import { LogDatasource } from '../../domain/datasources/log.datasource'
import { PrismaClient, SeverityLevel } from '@prisma/client'
import { LogEntity, LogLevel } from '../../domain/entities/log.entity'

export class PostgresLogDatasource implements LogDatasource {
  private readonly prismaClient: PrismaClient

  constructor () {
    this.prismaClient = new PrismaClient()
  }

  async saveLog (log: LogEntity): Promise<void> {
    const { message, level, origin } = log
    const levelUpperCase = level.toUpperCase()

    await this.prismaClient.logModel.create({
      data: {
        message,
        level: levelUpperCase as SeverityLevel,
        origin
      }
    })
  }

  async getLogs (severityLevel: LogLevel): Promise<LogEntity[]> {
    const severityLevelUpperCase = severityLevel.toUpperCase()

    const dbLogs = await this.prismaClient.logModel.findMany({
      where: {
        level: severityLevelUpperCase as SeverityLevel
      }
    })

    return dbLogs.map(LogEntity.fromObject)
  }
}
