const fs = require('fs')
const readline = require('readline')

const { cliColor } = require('./utils')
const { Hotel } = require('./models/Hotel')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

let hotel = null

class Command {
  constructor(input) {
    const [commandName, ...params] = input.split(' ')

    this.name = commandName
    this.params = params.map(param => (Number.isNaN(+param) ? param : +param))
  }

  run() {
    const { name: commandName, params } = this

    try {
      switch (commandName) {
        case 'create_hotel':
          var [numberOfFloor, numberOfRoomPerFloor] = params
          hotel = new Hotel({ numberOfFloor, numberOfRoomPerFloor })
          return

        case 'book':
          var [roomNumber, guestName, guestAge] = params
          hotel.bookRoom(roomNumber, guestName, guestAge)
          return

        case 'book_by_floor':
          var [floor, guestName, guestAge] = params
          hotel.bookAllRoomsOnFloor(floor, guestName, guestAge)
          return

        case 'checkout':
          var [keycardNumber, guestName] = params
          hotel.checkOutRoom(keycardNumber, guestName)
          return

        case 'checkout_guest_by_floor':
          var [floor] = params
          hotel.checkOutRoomByFloor(floor)
          return

        case 'get_guest_in_room':
          var [roomNumber] = params
          hotel.getGuestInRoom(roomNumber)
          return

        case 'list_available_rooms':
          hotel.listAvailableRooms()
          return

        case 'list_guest':
          hotel.listGuest()
          return

        case 'list_guest_by_age':
          var [operator, age] = params
          hotel.listGuestByAge(operator, age)
          return

        case 'list_guest_by_floor':
          var [floor] = params
          hotel.listGuestByFloor(floor)
          return

        default:
          console.log(`'${commandName}' is not a aqoda command (see README).`)
          return
      }
    } catch (error) {
      console.log(cliColor('ERROR!', 'danger'), error.message)
    }
  }
}

function main() {
  const inputFile = process.argv[2]

  if (inputFile) {
    const commands = getCommandsFromFileName(inputFile)
    commands.forEach(command => command.run())
    rl.close()
  } else {
    runCommandFromCommandLine()
  }
}

function getCommandsFromFileName(fileName) {
  const file = fs.readFileSync(fileName, 'utf-8')

  return file
    .split('\n')
    .filter(Boolean)
    .map(input => new Command(input))
}

function runCommandFromCommandLine() {
  rl.question('>>> ', input => {
    if (input == 'exit') return rl.close()
    if (input) new Command(input).run()
    runCommandFromCommandLine()
  })
}

main()
