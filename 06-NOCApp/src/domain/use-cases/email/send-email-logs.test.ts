import { mock } from 'node:test'
import { LogEntity } from '../../entities/log.entity'
import { LogRepository } from '../../repository/log.repository'
import { SendEmailLogs } from './send-email-logs'

describe('Send email logs', () => {
  const mockLogReppository: LogRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn()
  }

  const mockEmailService = {
    sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true)
  }

  const sendEmailLogs = new SendEmailLogs(
    mockLogReppository,
    mockEmailService as any)

  beforeEach(() => jest.clearAllMocks())

  test('Should call emailService.sendEmailWithFileSystemLogs when execute is called', async() => {
    const result =  await sendEmailLogs.execute(['efren.abi@gmail.com'])
    console.log(result)

    expect(result).toBe(true)
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1)
    expect(mockLogReppository.saveLog).toHaveBeenCalledWith({
        createAt: expect.any(Date),
        level: 'low',
        message: 'Send email with file system logs',
        origin: 'send-email-logs.ts'
    })
  })

  test('Should log in case of error', async() => {
    mockEmailService.sendEmailWithFileSystemLogs.mockReturnValue(false)

    const result =  await sendEmailLogs.execute(['efren.abi@gmail.com'])

    expect(result).toBe(false)
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1)
    expect(mockLogReppository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))

    expect(mockLogReppository.saveLog).toHaveBeenCalledWith({
        createAt: expect.any(Date),
        level: 'high',
        message: 'Error on send email with file system logs',
        origin: 'send-email-logs.ts'
    })
  })


})