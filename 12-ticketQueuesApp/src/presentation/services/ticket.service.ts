import { uuidAdapter } from '../../config/uuid.adapter'
import { Ticket } from '../../domain/interfaces/ticket'
import { WssService } from './wss.service'

const TICKETS_FACT: Ticket[] = [
  {
    id: uuidAdapter.v4(),
    number: 1,
    createdAt: new Date(),
    done: false,
    doneAt: new Date()
  },
  {
    id: uuidAdapter.v4(),
    number: 2,
    createdAt: new Date(),
    done: false,
    doneAt: new Date()
  },
  {
    id: uuidAdapter.v4(),
    number: 3,
    createdAt: new Date(),
    done: false,
    doneAt: new Date()
  },
  {
    id: uuidAdapter.v4(),
    number: 4,
    createdAt: new Date(),
    done: false,
    doneAt: new Date()
  },
  {
    id: uuidAdapter.v4(),
    number: 5,
    createdAt: new Date(),
    done: false,
    doneAt: new Date()
  }
]

export class TicketService {
  private readonly tickets: Ticket[]
  private readonly workingOnTickets: Ticket[] = []
  private readonly wssService: WssService = WssService.instance

  constructor () {
    this.tickets = TICKETS_FACT
  }

  public getAll (): Ticket[] {
    return this.tickets
  }

  public get pendingTickets (): Ticket[] {
    return this.tickets.filter(ticket => !ticket.done)
  }

  public get lastWorrkingOnTickets (): Ticket[] {
    return this.workingOnTickets.slice(0, 4)
  }

  public get lastTicket (): number {
    return this.tickets.length > 0 ? this.tickets.at(-1)!.number : 0
  }

  public createTicket (): Ticket {
    const newTicket: Ticket = {
      id: uuidAdapter.v4(),
      number: this.tickets.length + 1,
      createdAt: new Date(),
      done: false,
      handleAtDesk: undefined
    }
    this.tickets.push(newTicket)
    this.onTicketNumberChanged()

    return newTicket
  }

  public drawTicket (desk: string): Object {
    const ticket = this.tickets.find(t => t.handleAtDesk === undefined)

    if (ticket === undefined) return { status: 'empty', message: ' No pending tickets available' }

    const newTicket: Ticket = {
      ...ticket,
      handleAtDesk: desk,
      doneAt: new Date()
    }

    ticket.handleAtDesk = desk
    ticket.handleAt = new Date()

    this.workingOnTickets.unshift({ ...ticket })
    this.onTicketNumberChanged()
    this.onWorkingOnChanged()

    return { status: 'success', newTicket }
  }

  public onFinishedTicket (id: string): Object {
    const ticket = this.tickets.find(t => t.id === id)
    if (ticket === null) return { status: 'error', message: 'Ticket not found' }

    this.tickets.map(ticket => {
      if (ticket.id === id) {
        ticket.done = true
        ticket.doneAt = new Date()
      }
      return ticket
    })

    return { status: 'success', message: 'Ticket closed successfully' }
  }

  private onTicketNumberChanged (): void {
    this.wssService.sendMessage('on_ticket_count_changed', this.pendingTickets.length)
  }

  private onWorkingOnChanged (): void {
    this.wssService.sendMessage('on_working_changed', this.lastWorrkingOnTickets)
  }
}
