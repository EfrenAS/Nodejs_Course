const deskWorkingOnTickets = async () => {
  const workingOnTickets = await fetch('http://localhost:3000/api/ticket/working-on')
    .then(res => res.json())

  renderTicketsOnDesk(workingOnTickets)
}

const renderTicketsOnDesk = (tickets = []) => {
  for (let i = 0; i < tickets.length; i++) {
    if (i >= 4) break

    const ticket = tickets[i]

    const lblTicket = document.querySelector(`#lbl-ticket-0${i + 1}`)
    const lblDesk = document.querySelector(`#lbl-desk-0${i + 1}`)

    lblTicket.innerText = `Ticket ${ticket.number}`
    lblDesk.innerText = ticket.handleAtDesk
  }
}

function connectToWebSockets () {
  const socket = new WebSocket('ws://localhost:3000/ws')

  socket.onmessage = (event) => {
    const { type, payload } = JSON.parse(event.data)

    if (type !== 'on_working_changed') return

    renderTicketsOnDesk(payload)
  }

  socket.onclose = (event) => {
    setTimeout(() => {
      connectToWebSockets()
    }, 1500)
  }

  socket.onopen = (event) => {
    console.log('Connected')
  }
}

connectToWebSockets()
deskWorkingOnTickets()
