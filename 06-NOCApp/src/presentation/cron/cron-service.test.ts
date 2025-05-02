import { CronService } from './cron-service'

describe('CronService', () => {
  const mockTick = jest.fn()
  
  test('Should create a cron job', (done) => {
    const job = CronService.createJob({cronTime:'* * * * * *', onTick: mockTick} )

    setTimeout(() => {
      expect(mockTick).toHaveBeenCalledTimes(2)

      job.stop()
      done()
    }, 2000)
  })
})