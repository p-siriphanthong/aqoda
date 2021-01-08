const { Room } = require('./Room')
const { Keycard } = require('./Keycard')
const { Booking } = require('./Booking')

class Hotel {
  constructor({ numberOfFloor, numberOfRoomPerFloor }) {
    this.numberOfFloor = numberOfFloor
    this.numberOfRoomPerFloor = numberOfRoomPerFloor

    this.rooms = generateHotelRooms(numberOfFloor, numberOfRoomPerFloor)
    this.keycards = generateHotelKeycards(numberOfFloor, numberOfRoomPerFloor)
    this.bookings = []

    console.log(
      `Hotel created with ${numberOfFloor} floor(s), ${numberOfRoomPerFloor} room(s) per floor.`
    )
  }

  get availableRooms() {
    return this.rooms.filter(room => room.isAvailable)
  }

  get availableKeycards() {
    return this.keycards.filter(keycard => keycard.isAvailable)
  }

  get availableKeycard() {
    return this.availableKeycards[0]
  }

  findRoom(roomNumber) {
    return this.rooms.find(room => room.roomNumber === roomNumber)
  }

  bookRoom(roomNumber, guestName, guestAge) {
    const room = this.findRoom(roomNumber)

    const keycard = this.availableKeycard
    const booking = new Booking({
      room,
      keycard,
      guestName,
      guestAge,
    })

    booking.checkIn()
    this.bookings.push(booking)

    console.log(
      `Room ${room.roomNumber} is booked by ${guestName} with keycard number ${keycard.keycardNumber}.`
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
