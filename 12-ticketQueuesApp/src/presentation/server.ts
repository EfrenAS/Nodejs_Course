import cors from 'cors'
import express, { Router } from 'express'
import path from 'path'

interface Options {
  port: number
  publicPath?: string
}

export class Server {
  public readonly app = express()
  private serverListener?: any
  private readonly port: number
  private readonly publicPath: string

  constructor (options: Options) {
    const { port, publicPath = 'public' } = options
    this.port = port
    this.publicPath = publicPath
    this.configure()
  }

  private configure (): void {
    //* Middlewares
    this.app.use(express.json()) // raw
    this.app.use(express.urlencoded({ extended: true })) // x-www-form-urlencoded
    this.app.use(cors())
    //* Public Folder
    this.app.use(express.static(this.publicPath))

    //* SPA /^\/(?!api).*/  <== Únicamente si no empieza con la palabra api
    this.app.get(/^\/(?!api).*/, (_req, res) => {
      const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`)
      res.sendFile(indexPath)
    })
  }

  //* Routes
  public setRoutes (router: Router): void {
    this.app.use(router)
  }

  async start (): Promise<void> {
    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`)
    })
  }

  public close (): void {
    this.serverListener?.close()
  }
}
