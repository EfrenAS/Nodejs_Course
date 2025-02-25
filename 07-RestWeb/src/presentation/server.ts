import express, { Router } from 'express'
import path from 'node:path'

interface Options {
  port: number
  publicPath?: string
  routes: Router
}


export class Server {
  private app = express()
  private readonly routes: Router
  private readonly port: number
  private readonly publicPath: string

  constructor(options: Options) {
    const { routes, port, publicPath = 'public' } = options

    this.port = port
    this.publicPath = publicPath
    this.routes = routes
  }
  
  async start() {
    
    //* Middlewares
    this.app.use(express.json()) // parse application/json or raw
    this.app.use(express.urlencoded({ extended: true })) // parse application/x-www-form-urlencoded

    //* Public files
    this.app.use(express.static(this.publicPath))
  
    //* Routes
    this.app.use(this.routes)
    
    //* SPA
    this.app.get('*', (_req, res) => {
      const indexPath = path.join(__dirname, `../../${this.publicPath}/index.html`)
      res.sendFile(indexPath)
    })

    this.app.listen(this.port, () =>{
      console.log(`Server is running on port ${this.port}`);
    })
  }
}