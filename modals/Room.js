class Room {
  constructor({ floor, runningNumber }) {
    this.roomNumber = +`${floor}${runningNumber.toString().padStart(2, '0')}`
    this.floor = floor
  }
}

module.exports = { Room }
