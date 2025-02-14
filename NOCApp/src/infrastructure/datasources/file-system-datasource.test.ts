import fs from 'node:fs'
import path from 'node:path'
import { FileSystemDatasource } from './file-system.datasource'
import { LogEntity, LogLevel } from '../../domain/entities/log.entity'


describe('FileSystemDatasource', () => {
  const logPath = path.join(__dirname, '../../../logs')
  
  beforeEach(()=> {
    fs.rmSync(logPath, { recursive: true, force: true })
  })
  
  test('Should create log files if this does not exist', () => {
    new FileSystemDatasource()
    
    const files = fs.readdirSync(logPath)
    
    expect(files).toEqual(['logs-all.log', 'logs-high.log', 'logs-medium.log' ])
    
  })
  
  test('Should save a log in logs-all.log file', () => {
    const logDatasource = new FileSystemDatasource()
    const log =  new LogEntity({
      level: LogLevel.LOW,
      origin: 'file-system-datasource.test.ts',
      message: 'Save log in file system from test'
    })

    logDatasource.saveLog(log)

    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8')

    expect(allLogs).toContain(JSON.stringify(log))

  })

  test('Should save a log in logs-medium.log file', () => {
    const logDatasource = new FileSystemDatasource()
    const log =  new LogEntity({
      level: LogLevel.MEDIUM,
      origin: 'file-system-datasource.test.ts',
      message: 'Save log in file system from test'
    })

    logDatasource.saveLog(log)

    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8')
    const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf-8')

    expect(allLogs).toContain(JSON.stringify(log))
    expect(mediumLogs).toContain(JSON.stringify(log))
  })

  test('Should save a log in logs-high.log file', () => {
    const logDatasource = new FileSystemDatasource()
    const log =  new LogEntity({
      level: LogLevel.HIGH,
      origin: 'file-system-datasource.test.ts',
      message: 'Save log in file system from test'
    })

    logDatasource.saveLog(log)

    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8')
    const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, 'utf-8')

    expect(allLogs).toContain(JSON.stringify(log))
    expect(highLogs).toContain(JSON.stringify(log))
  })

  test('Should get logs in logs-all.log file', async() => {
    const logDatasource = new FileSystemDatasource()
    const lowLog = new LogEntity({
      level: LogLevel.LOW,
      origin: 'file-system-datasource.test.ts',
      message: 'Low log from test'
    })

    const mediumLog = new LogEntity({
      level: LogLevel.MEDIUM,
      origin: 'file-system-datasource.test.ts',
      message: 'Medium log from test'
    })

    const highLog = new LogEntity({

      level: LogLevel.HIGH,
      origin: 'file-system-datasource.test.ts',
      message: 'High log from test'
    })

    await logDatasource.saveLog(lowLog)
    await logDatasource.saveLog(mediumLog)
    await logDatasource.saveLog(highLog)

    const logsLow = await logDatasource.getLogs(LogLevel.LOW)
    const logsMedium = await logDatasource.getLogs(LogLevel.MEDIUM)
    const logsHigh = await logDatasource.getLogs(LogLevel.HIGH)

    expect(logsLow).toEqual(expect.arrayContaining([lowLog, mediumLog, highLog]))
    expect(logsMedium).toEqual(expect.arrayContaining([mediumLog]))
    expect(logsHigh).toEqual(expect.arrayContaining([highLog]))
  })
})
