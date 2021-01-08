class Keycard {
  constructor({ keycardNumber }) {
    this.keycardNumber = keycardNumber
    this.isAvailable = true
  }

  takeOut() {
    this.isAvailable = false
  }

  takeBack() {
    this.isAvailable = true
  }
}

module.exports = { Keycard }
