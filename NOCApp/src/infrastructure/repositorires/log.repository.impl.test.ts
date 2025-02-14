import { LogRepositoryImpl } from './log.repositry.impl'
import { LogEntity, LogLevel } from '../../domain/entities/log.entity'


describe('LogRepositoryImpl', () => {
  const mockLogDatasource = {
    saveLog: jest.fn(),
    getLogs: jest.fn()
  }

  const logRepository = new LogRepositoryImpl(mockLogDatasource)
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('saveLog should call the datasource with arguments', async() => {
    const log = new LogEntity({ message: 'test', level: LogLevel.LOW, origin: 'test' })

    await logRepository.saveLog(log)

    expect(mockLogDatasource.saveLog).toHaveBeenCalledWith(log)
  })

  test('getLogs should call the datasource with arguments', async() => {
    await logRepository.getLogs(LogLevel.LOW)

    expect(mockLogDatasource.getLogs).toHaveBeenCalledWith(LogLevel.LOW)
  })
})