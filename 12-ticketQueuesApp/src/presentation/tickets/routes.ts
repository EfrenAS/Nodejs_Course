import { Router } from 'express'
import { TicketsController } from './controller'

export class TicketsRoutes {
  static get routes (): Router {
    const router = Router()

    const ticketController = new TicketsController()

    router.get('/', ticketController.getAllTickets)
    router.get('/last', ticketController.getLastTicket)
    router.get('/pending', ticketController.pending)

    router.post('/', ticketController.create)

    router.get('/draw/:desk', ticketController.draw)
    router.put('/done/:ticketId', ticketController.close)

    router.get('/working-on', ticketController.workingOn)

    return router
  }
}
