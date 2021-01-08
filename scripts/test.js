const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')

const inputFile = path.resolve('example/input.txt')
const outputFile = path.resolve('example/output.txt')

const styles = {
  reset: '\x1b[0m',
  fg: {
    danger: '\x1b[31m',
    success: '\x1b[32m',
  },
  bg: {
    danger: '\x1b[30m\x1b[41m',
    success: '\x1b[30m\x1b[42m',
  },
}

function color(string, modifier, isBackground = false) {
  const type = isBackground ? 'bg' : 'fg'
  return styles[type][modifier] + string + styles.reset
}

exec(`npm run --silent start ${inputFile}`, (error, stdout) => {
  if (error) {
    console.log(error.message)
    return
  }

  const input = fs.readFileSync(inputFile, 'utf-8').split('\n')
  const output = fs.readFileSync(outputFile, 'utf-8').split('\n')
  const result = stdout.split('\n')

  const testResult = { passed: 0, failed: 0 }

  input.forEach((command, index) => {
    if (!command) return

    if (output[index] === result[index]) {
      console.log(color(' PASS ', 'success', true), command)
      testResult.passed += 1
    } else {
      console.log(color(' FAIL ', 'danger', true), command)
      console.log('  ', color('Expected:', 'success'), output[index])
      console.log('  ', color('Received:', 'danger'), result[index])
      testResult.failed += 1
    }
  })

  const { failed, passed } = testResult
  const total = failed + passed
  console.log(
    `\nTests: ${color(
      `${failed} failed`,
      failed ? 'danger' : 'success'
    )}, ${color(`${passed} passed`, 'success')}, ${total} total\n`
  )
})
