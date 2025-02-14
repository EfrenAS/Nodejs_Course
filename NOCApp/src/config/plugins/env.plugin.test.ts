import { envPlugin } from './env.plugin'

describe('env.plugin', (): void => {

  test('Should return env options', () => {
    expect(envPlugin).toEqual({
      PORT:3000,
      MAILER_SERVICE:'gmail',
      MAILER_EMAIL:'histrix.dev@gmail.com',
      MAILER_SECRET_KEY:'ozhdfjuauksgrafg',
      MONGO_URL:'mongodb://admin:admin@localhost:27017',
      MONGO_HOST: 'localhost',
      MONGO_PORT: '27017',
      MONGO_DB_NAME:'NOCApp',
      MONGO_USER:'admin',
      MONGO_PASSWORD:'admin',
      PROD: false
    })
  })

  test('Should return error if not found env', async () => {
    jest.resetModules()
    process.env.PORT = 'ABC'

    try {
      await import('./env.plugin')

      expect(true).toBe(false)
    } catch (error) {
      expect(`${error}`).toBe('EnvVarError: env-var: \"PORT\" should be a valid integer')
    }
  })
})
