const CONSTS = {
  DESK: 'escritorio',
  INDEX_PAGE: 'index.html'
}

// HTML Elements
const ticketQueueElement = document.querySelector('#lbl-pending')
const deskHeader = document.querySelector('h1')
const noMoreAlert = document.querySelector('.alert')
const lblCurrentTicket = document.querySelector('small')

const btnDraw = document.querySelector('#btn-draw')
const btnClose = document.querySelector('#btn-close')

const searchParams = new URLSearchParams(window.location.search)
if (!searchParams.has(CONSTS.DESK)) {
  window.Location = CONSTS.INDEX_PAGE
  throw new Error('Desk is not selected')
}

const deskNumber = searchParams.get(CONSTS.DESK)
deskHeader.textContent = deskNumber

let workingTicket = null

const onHandlerQueueChange = (payload) => {
  checkTicketCount(payload)
}

const checkTicketCount = (initialCount = 0) => {
  (initialCount === 0)
    ? noMoreAlert.classList.remove('d-none')
    : noMoreAlert.classList.toggle('d-none')

  ticketQueueElement.textContent = initialCount
}

const loadInitialCount = async () => {
  const pendingTickets = await fetch('http://localhost:3000/api/ticket/pending')
    .then(response => response.json())

  checkTicketCount(pendingTickets.length)
}

const getTicket = async () => {
  await closedTicket()

  const { status, newTicket, message } = await fetch(`http://localhost:3000/api/ticket/draw/${deskNumber}`)
    .then(response => response.json())

  if (status === 'empty') {
    lblCurrentTicket.textContent = message
    return
  }

  workingTicket = newTicket
  lblCurrentTicket.textContent = newTicket.number
}

const closedTicket = async () => {
  if (!workingTicket) return

  const { status, message } = await fetch(`http://localhost:3000/api/ticket/done/${workingTicket.id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())

  if (status === 'error') throw new Error(message)

  if (status === 'success') {
    workingTicket = null
    lblCurrentTicket.textContent = message
  }
}

function connectToWebSockets () {
  const socket = new WebSocket('ws://localhost:3000/ws')

  socket.onmessage = (event) => {
    const { type, payload } = JSON.parse(event.data)

    if (type !== 'on_ticket_count_changed') return

    onHandlerQueueChange(payload)
  }

  socket.onclose = (event) => {
    console.log('Connection closed')
    setTimeout(() => {
      console.log('retrying to connect')
      connectToWebSockets()
    }, 1500)
  }

  socket.onopen = (event) => {
    console.log('Connected')
  }
}

btnDraw.addEventListener('click', getTicket)
btnClose.addEventListener('click', closedTicket)

loadInitialCount()
connectToWebSockets()
