import { Request, Response } from 'express'
import { TicketService } from '../services/ticket.service'

export class TicketsController {
  constructor (
    private readonly ticketService = new TicketService()
  ) {}

  public getAllTickets = async (_req: Request, res: Response): Promise<void> => {
    res.json(this.ticketService.getAll())
  }

  public getLastTicket = async (req: Request, res: Response): Promise<void> => {
    res.json(this.ticketService.lastTicket)
  }

  public pending = async (req: Request, res: Response): Promise<void> => {
    res.json(this.ticketService.pendingTickets)
  }

  public create = async (req: Request, res: Response): Promise<void> => {
    res.status(201).json(this.ticketService.createTicket())
  }

  public draw = async (req: Request, res: Response): Promise<void> => {
    const { desk } = req.params
    res.json(this.ticketService.drawTicket(desk))
  }

  public close = async (req: Request, res: Response): Promise<void> => {
    const { ticketId } = req.params
    res.json(this.ticketService.onFinishedTicket(ticketId))
  }

  public workingOn = async (req: Request, res: Response): Promise<void> => {
    res.json(this.ticketService.lastWorrkingOnTickets)
  }
}
