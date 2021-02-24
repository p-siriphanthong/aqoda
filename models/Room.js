class Room {
  constructor({ floor, runningNumber }) {
    this.roomNumber = +`${floor}${runningNumber.toString().padStart(2, '0')}`
    this.floor = floor
    this.isAvailable = true
  }

  takeOut() {
    this.isAvailable = false
  }

  takeBack() {
    this.isAvailable = true
  }
}

module.exports = { Room }
