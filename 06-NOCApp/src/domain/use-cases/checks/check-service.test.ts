import { LogEntity } from '../../entities/log.entity'
import { CheckService } from './check-service'

describe('Check service', () => {
  const mockReppository = {
    saveLog: jest.fn(),
    getLogs: jest.fn()
  }

  const successCallback = jest.fn()
  const errorCallback = jest.fn()

  const checkService = new CheckService(mockReppository, successCallback, errorCallback)

  beforeEach(() => jest.clearAllMocks())

  test('Should call successCallback when fetch returns true', async() => {
    const wasOk = await checkService.execute('https://www.google.com')

    expect(wasOk).toBe(true)
    expect(successCallback).toHaveBeenCalled()
    expect(errorCallback).not.toHaveBeenCalled()
    expect(mockReppository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    )
  })

  test('Should call errorCallback when fetch returns false', async() => {
    const wasOk = await checkService.execute('https://www.gooasdasdgle.com')

    expect(wasOk).toBe(true)
    expect(successCallback).not.toHaveBeenCalled()
    expect(errorCallback).toHaveBeenCalled()
    expect(mockReppository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    )
  })

})