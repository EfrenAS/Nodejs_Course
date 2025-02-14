import nodemailer from 'nodemailer'
import { EmailService } from './email.service'

describe ('EmailService', () => {
  const mockSendEMail = jest.fn()

  nodemailer.createTransport = jest.fn().mockReturnValue({
    sendMail: mockSendEMail
  })
  
  const emailService = new EmailService()

  test('Should send email', async() => {

    const options = {
      to: 'test@test.com',
      subject: 'test',
      htmlBody: '<h1>test</h1>',
      attachments: []
    }

    const isSendEmail = await emailService.sendEmail(options)

    expect(isSendEmail).toBeTruthy
    expect(mockSendEMail).toHaveBeenCalledWith({
      attachments: expect.any(Array),
      html: '<h1>test</h1>',
      subject: 'test',
      to: 'test@test.com'
    })

  })

  test('Should send email with file system logs', async() => {
    const email = 'test@test.com'

    await emailService.sendEmailWithFileSystemLogs(email)

    expect(mockSendEMail).toHaveBeenCalledWith({
      attachments: [
        {
          filename: 'logs-all.log',
          path: './logs/logs-all.log'
        },
        {
          filename: 'logs-high.log',
          path: './logs/logs-high.log'
        },
        {
          filename: 'logs-medium.log',
          path: './logs/logs-medium.log'
        }
      ],
      html: expect.any(String),
      subject: 'Logs del servidor NOCApp',
      to: 'test@test.com'
    })
  })
})