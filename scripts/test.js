const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')

const { cliColor } = require('../utils')

const inputFile = path.resolve('example/input.txt')
const outputFile = path.resolve('example/output.txt')

exec(`npm run --silent start ${inputFile}`, (error, stdout) => {
  if (error) {
    console.log(cliColor('ERROR!', 'danger'), error.message)
    return
  }

  const input = fs.readFileSync(inputFile, 'utf-8').split('\n')
  const output = fs.readFileSync(outputFile, 'utf-8').split('\n')
  const result = stdout.split('\n')

  const testResult = { passed: 0, failed: 0 }

  input.forEach((command, index) => {
    if (!command) return

    if (output[index] === result[index]) {
      console.log(cliColor(' PASS ', 'success', true), command)
      testResult.passed += 1
    } else {
      console.log(cliColor(' FAIL ', 'danger', true), command)
      console.log('  ', cliColor('Expected:', 'success'), output[index])
      console.log('  ', cliColor('Received:', 'danger'), result[index])
      testResult.failed += 1
    }
  })

  const { failed, passed } = testResult
  const total = failed + passed
  console.log(
    `\nTests: ${cliColor(
      `${failed} failed`,
      failed ? 'danger' : 'success'
    )}, ${cliColor(`${passed} passed`, 'success')}, ${total} total\n`
  )
})
