const fs = require('fs')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

class Command {
  constructor(input) {
    const [commandName, ...params] = input.split(' ')

    this.name = commandName

    this.params = params.map((param) => {
      const parsedParam = parseInt(param, 10)
      return Number.isNaN(parsedParam) ? param : parsedParam
    })
  }

  run() {
    const { name: commandName, params } = this
    switch (commandName) {
      case 'create_hotel':
        const [floor, roomPerFloor] = params
        const hotel = { floor, roomPerFloor }

        console.log(
          `Hotel created with ${floor} floor(s), ${roomPerFloor} room(s) per floor.`
        )
        return

      default:
        console.log(`'${commandName}' is not a aqoda command (see README).`)
        return
    }
  }
}

function main() {
  const inputFile = process.argv[2]

  if (inputFile) {
    const commands = getCommandsFromFileName(inputFile)
    commands.forEach((command) => command.run())
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
    .map((input) => new Command(input))
}

function runCommandFromCommandLine() {
  rl.question('>>> ', (input) => {
    if (input == 'exit') return rl.close()
    if (input) new Command(input).run()
    runCommandFromCommandLine()
  })
}

main()
