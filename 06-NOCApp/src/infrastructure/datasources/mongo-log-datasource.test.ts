import { MongoDatabase } from '../../data/mongo/init'
import {MongoLogDatasource} from './mongo-log.datasource'
import {envPlugin} from '../../config/plugins/env.plugin'
import mongoose from 'mongoose'
import { LogEntity, LogLevel } from '../../domain/entities/log.entity'
import { LogDatasource } from '../../domain/datasources/log.datasource'


describe('MongoLogDatasource', () => {
  
  const log = new LogEntity({
    level: LogLevel.LOW,
    message: 'Save log in mongo',
    origin: 'save-log-in-mongo.ts'
  })
  
  const logDatasource = new MongoLogDatasource()

  beforeAll(async() => {
    await MongoDatabase.connect({
      dbName: envPlugin.MONGO_DB_NAME,
      mongoUrl: envPlugin.MONGO_URL,
    })
  })

  afterAll(async() => {
    mongoose.connection.close()
  })

  test('Should save log in mongo', async() => {

    const logSpy = jest.spyOn(console, 'log')

    await logDatasource.saveLog(log)

    expect(logSpy).toHaveBeenCalled()
    expect(logSpy).toHaveBeenCalledWith()
  })

  test('Should get logs in mongo', async() => {
    await logDatasource.saveLog(log)
    await logDatasource.saveLog(log)

    const logs = await logDatasource.getLogs(LogLevel.LOW)

    expect(logs.length).toBe(43)
    expect(logs[0].level).toBe(LogLevel.LOW)
  })
})