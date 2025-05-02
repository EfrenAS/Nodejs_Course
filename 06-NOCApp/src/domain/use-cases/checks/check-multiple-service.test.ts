import { CheckMultipleService } from './check-multiple-service'
import { LogEntity } from '../../entities/log.entity'
import { mock } from 'node:test'


describe('Check multiple service', () => {

    const mockRepo1 = {
      saveLog: jest.fn(),
      getLogs: jest.fn()
    }

    const mockRepo2 = {
      saveLog: jest.fn(),
      getLogs: jest.fn()
    }

    const mockRepo3 = {
      saveLog: jest.fn(),
      getLogs: jest.fn()
    }

    const successCallback = jest.fn()
    const errorCallback = jest.fn()
  
    const checkMultipleService = new CheckMultipleService([mockRepo1, mockRepo2, mockRepo3], successCallback, errorCallback)
  
    beforeEach(() => jest.clearAllMocks())

  test('Should call successCallback when fetch returns true', async() => {
    const wasOk = await checkMultipleService.execute('https://www.google.com')
  
    expect(wasOk).toBe(true)
    expect(successCallback).toHaveBeenCalled()
    expect(errorCallback).not.toHaveBeenCalled()

    expect(mockRepo1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
    expect(mockRepo2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
    expect(mockRepo3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
  })


    test('Should call errorCallback when fetch returns false', async() => {
      const wasOk = await checkMultipleService.execute('https://www.gooasdasdgle.com')
  
      expect(wasOk).toBe(true)
      expect(successCallback).not.toHaveBeenCalled()
      expect(errorCallback).toHaveBeenCalled()
  
      expect(mockRepo1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
      expect(mockRepo2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
      expect(mockRepo3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
    })
})