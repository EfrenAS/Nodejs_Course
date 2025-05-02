
const URL_SERVER = 'http://localhost:3000/api/ticket'

async function getLastTicketNumber () {
  try {
    const response = await fetch(`${URL_SERVER}/last`)
    const data = await response.json()
    console.log(data)
    return data
  } catch (error) {
    console.error(error)
  }
}

async function createNewTicket () {
  try {
    const response = await fetch(`${URL_SERVER}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()
    console.log(data)
    return data.ticket
  } catch (error) {
    console.error(error)
  }
}

async function main () {
  const currentTicketLbl = document.getElementById('lbl-new-ticket')
  const currentTicket = await getLastTicketNumber()

  const formNewTicket = document.querySelector('form')

  formNewTicket.addEventListener('formdata', async (event) => {
    event.preventDefault()
    await createNewTicket()
  })

  currentTicketLbl.textContent = currentTicket
}

main()
