const { Guest } = require('./Guest')

class Booking {
  constructor({ room, keycard, guestName, guestAge }) {
    this.room = room
    this.keycard = keycard
    this.guest = new Guest({ name: guestName, age: guestAge })
  }

  checkIn() {
    this.room.takeOut()
    this.keycard.takeOut()
  }

  checkOut() {
    this.room.takeBack()
    this.keycard.takeBack()
  }
}

module.exports = { Booking }
