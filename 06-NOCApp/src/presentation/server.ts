import { CronService } from './cron/cron-service'
// import { CheckService } from '../domain/use-cases/checks/check-service'
import { CheckMultipleService } from '../domain/use-cases/checks/check-multiple-service'

import { LogRepositoryImpl } from '../infrastructure/repositorires/log.repositry.impl'
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource'
import { PostgresLogDatasource } from '../infrastructure/datasources/postgres-log.datasource'
import { MongoLogDatasource } from '../infrastructure/datasources/mongo-log.datasource'

// import { LogLevel } from '../domain/entities/log.entity'
// import { EmailService } from './email/email.service'
// import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs'

// const logRepository = new LogRepositoryImpl(
//   // new FileSystemDatasource()
//   // new MongoLogDatasource()
//   new PostgresLogDatasource()
// )

const fsLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
)

const mongoLogRepository = new LogRepositoryImpl(
  new MongoLogDatasource()
)

const postgresLogRepository = new LogRepositoryImpl(
  new PostgresLogDatasource()
)

// export class Server {
//   public static async start (): Promise<void> {
//     console.log('Server started!!!')

//     // const emailService = new EmailService()
//     const url = 'http://localhost:3000'

//     // emailService.sendEmailWithFileSystemLogs(['efren.abi@gmail.com'])
//     // new SendEmailLogs(
//     //   logRepository,
//     //   emailService
//     // ).execute(['efren.abi@gmail.com'])

//     CronService.createJob({
//       cronTime: '*/5 * * * * *',
//       onTick: async (): Promise<void> => {
//         await new CheckMultipleService(
//           [fsLogRepository, mongoLogRepository, postgresLogRepository],
//           () => console.log('Success'),
//           (error: string) => console.log(error)
//         ).execute(url)
//       }
//     })
//   }
// }

export const server = {
  async start (): Promise<void> {
    console.log('Server started!!!')

    const url = 'http://localhost:3000'

    // emailService.sendEmailWithFileSystemLogs(['efren.abi@gmail.com'])
    // new SendEmailLogs(
    //   logRepository,
    //   emailService
    // ).execute(['efren.abi@gmail.com'])

    CronService.createJob({
      cronTime: '*/5 * * * * *',
      onTick: async (): Promise<void> => {
        await new CheckMultipleService(
          [fsLogRepository, mongoLogRepository, postgresLogRepository],
          () => console.log('Success'),
          (error: string) => console.log(error)
        ).execute(url)
      }
    })
  }
}
