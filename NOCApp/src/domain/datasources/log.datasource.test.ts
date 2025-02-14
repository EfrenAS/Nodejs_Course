import { LogEntity, LogLevel } from '../entities/log.entity'
import { LogDatasource } from './log.datasource'


describe('log.datasource.ts', () => {
  const newLog = new LogEntity({
    origin: 'log,datasource.test.ts',
    message: 'test-message',
    level: LogLevel.LOW 
  })

  class MockLogDatasource implements LogDatasource {
    async saveLog (log: LogEntity): Promise<void> {
      return
    }

    async getLogs (severityLevel: LogLevel): Promise<LogEntity[]> {
      return [newLog]
    }
  }

  test('Should test the absctract class', async() => {
    const mockLogDatasource = new MockLogDatasource()

    expect(mockLogDatasource).toBeInstanceOf(MockLogDatasource)
    expect(typeof mockLogDatasource.saveLog).toBe('function')
    expect(typeof mockLogDatasource.getLogs).toBe('function')

    await mockLogDatasource.saveLog(newLog)
    
    const logs = await mockLogDatasource.getLogs(LogLevel.HIGH)
    
    expect(logs).toHaveLength(1)
    expect(logs[0]).toBeInstanceOf(LogEntity)

  })
})