import fs from 'node:fs'
import { LogDatasource } from '../../domain/datasources/log.datasource'
import { LogEntity, LogLevel } from '../../domain/entities/log.entity'

export class FileSystemDatasource implements LogDatasource {
  private readonly LOGS_ROOT_PATH = 'logs/'
  private readonly LOG_FILES_PATH = {
    ALL_LOGS_PATH: 'logs/logs-all.log',
    MEDIUM_LOGS_PATH: 'logs/logs-medium.log',
    HIGHT_LOGS_PATH: 'logs/logs-high.log'
  }

  constructor () {
    this.createLogFile()
  }

  private createLogFile (): void {
    if (!fs.existsSync(this.LOGS_ROOT_PATH)) {
      fs.mkdirSync(this.LOGS_ROOT_PATH)
    }

    for (const path in this.LOG_FILES_PATH) {
      const pathIndex = this.LOG_FILES_PATH[path as keyof typeof this.LOG_FILES_PATH]

      if (fs.existsSync(pathIndex)) return

      fs.writeFileSync(pathIndex, '')
    }
  }

  private getLogsFromFile (path: string): LogEntity[] {
    const content = fs.readFileSync(path, 'utf-8')

    if (content === '') return []

    const logs = content.split('\n').map(LogEntity.fromJson)

    return logs
  }

  async saveLog (newLog: LogEntity): Promise<void> {
    const logAsJson = `${ JSON.stringify(newLog) }\n`
    const { ALL_LOGS_PATH, MEDIUM_LOGS_PATH, HIGHT_LOGS_PATH } = this.LOG_FILES_PATH

    fs.appendFileSync(ALL_LOGS_PATH, logAsJson)

    if (newLog.level === LogLevel.LOW) return

    if (newLog.level === LogLevel.MEDIUM) {
      fs.appendFileSync(MEDIUM_LOGS_PATH, logAsJson)
    } else {
      fs.appendFileSync(HIGHT_LOGS_PATH, logAsJson)
    }
  }

  async getLogs (severityLevel: LogLevel): Promise<LogEntity[]> {
    const { LOW, MEDIUM, HIGH } = LogLevel
    const { ALL_LOGS_PATH, MEDIUM_LOGS_PATH, HIGHT_LOGS_PATH } = this.LOG_FILES_PATH

    switch (severityLevel) {
      case LOW:
        return this.getLogsFromFile(ALL_LOGS_PATH)
      case MEDIUM:
        return this.getLogsFromFile(MEDIUM_LOGS_PATH)
      case HIGH:
        return this.getLogsFromFile(HIGHT_LOGS_PATH)
      default:
        throw new Error('Invalid severity level, it is not implemented')
    }
  }
}
