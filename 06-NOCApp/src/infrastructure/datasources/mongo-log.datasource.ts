import { LogModel } from '../../data/mongo/models/log.model'
import { LogDatasource } from '../../domain/datasources/log.datasource'
import { LogEntity, LogLevel } from '../../domain/entities/log.entity'

export class MongoLogDatasource implements LogDatasource {
  async saveLog (log: LogEntity): Promise<void> {
    const newLog = await LogModel.create(log)

    console.log(newLog)
  }

  async getLogs (severityLevel: LogLevel): Promise<LogEntity[]> {
    const logs = await LogModel.find({ level: severityLevel })

    return logs.map(mongoLog => LogEntity.fromObject(mongoLog))
  }
}
