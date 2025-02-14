import nodemailer from 'nodemailer'
import { envPlugin } from '../../config/plugins/env.plugin'

export interface SendEmailOptions {
  to: string | string[]
  subject: string
  htmlBody: string
  attachments: Attachment[]
}

export interface Attachment {
  filename: string
  path: string
}

export class EmailService {
  private readonly transporter = nodemailer.createTransport({
    service: envPlugin.MAILER_SERVICE,
    auth: {
      user: envPlugin.MAILER_EMAIL,
      pass: envPlugin.MAILER_SECRET_KEY
    }
  })

  async sendEmail (options: SendEmailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options

    try {
      const isSendEmail = await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments
      })

      console.log(isSendEmail)

      return true
    } catch (error) {
      return false
    }
  }

  async sendEmailWithFileSystemLogs (to: string | string []): Promise<boolean> {
    const subject = 'Logs del servidor NOCApp'
    const htmlBody = `
      <h1>Logs del servidor NOCApp</h1>
      <p>Este es un mensaje de prueba, desde el servidor NOCApp para envio de logs del servidor</p>
      <p>Ver todos los logs en <a href="http://localhost:3000/logs">http://localhost:3000/logs</a></p>
    `
    const attachments: Attachment[] = [
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
    ]

    return await this.sendEmail({
      to,
      subject,
      htmlBody,
      attachments
    })
  }
}
