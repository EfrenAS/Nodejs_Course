import { LogEntity, LogLevel } from './log.entity'

describe('log.entity.ts', () => {
  const dataObj = {
    message: 'test-message',
    level: LogLevel.HIGH,
    origin: 'log.entity.test.ts'
  }

  test('Should create a LogEntity instance', () => {

    const log = new LogEntity(dataObj)

    expect(log.message).toBe(dataObj.message)
    expect(log).toBeInstanceOf(LogEntity)
    expect(log.level).toBe(dataObj.level)
    expect(log.origin).toBe(dataObj.origin)
    expect(log.createdAt).toBeInstanceOf(Date)
  })

  test('Should create a LogEntity instance from JSON', () => {
    const json = `{"message":"fetch failed","level":"high","createdAt":"2025-01-26T22:45:45.074Z","origin":"check-service.ts"} `

    const log = LogEntity.fromJSON(json)

    expect(log).toBeInstanceOf(LogEntity)
    expect(log.message).toBe('fetch failed')
    expect(log.level).toBe(LogLevel.HIGH)
    expect(log.origin).toBe('check-service.ts')
    expect(log.createdAt).toBeInstanceOf(Date)
  })

  test('Should create a LogEntity instance from object', () => {
    const log = LogEntity.fromObject(dataObj)
    
    expect(log).toBeInstanceOf(LogEntity)
    expect(log.message).toBe(dataObj.message)
    expect(log.level).toBe(dataObj.level)
    expect(log.origin).toBe(dataObj.origin)
    expect(log.createdAt).toBeInstanceOf(Date)
  })
})