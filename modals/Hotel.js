const { Room } = require('./Room')
const { Keycard } = require('./Keycard')

class Hotel {
  constructor({ numberOfFloor, numberOfRoomPerFloor }) {
    this.numberOfFloor = numberOfFloor
    this.numberOfRoomPerFloor = numberOfRoomPerFloor

    this.rooms = generateHotelRooms(numberOfFloor, numberOfRoomPerFloor)
    this.availableKeycards = generateHotelKeycards(
      numberOfFloor,
      numberOfRoomPerFloor
    )

    console.log(
      `Hotel created with ${numberOfFloor} floor(s), ${numberOfRoomPerFloor} room(s) per floor.`
    )
  }
}

function generateHotelRooms(numberOfFloor, numberOfRoomPerFloor) {
  const rooms = []

  for (let floor = 1; floor <= numberOfFloor; floor += 1) {
    for (let number = 1; number <= numberOfRoomPerFloor; number += 1) {
      rooms.push(new Room({ floor, runningNumber: number }))
    }
  }

  return rooms
}

function generateHotelKeycards(numberOfFloor, numberOfRoomPerFloor) {
  return Array.from(
    { length: numberOfFloor * numberOfRoomPerFloor },
    (_, i) => i + 1
  ).map(keycardNumber => new Keycard({ keycardNumber }))
}

module.exports = { Hotel }
