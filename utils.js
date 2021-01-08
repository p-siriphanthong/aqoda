const cliStyles = {
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

function cliColor(string, modifier, isBackground = false) {
  const type = isBackground ? 'bg' : 'fg'
  return cliStyles[type][modifier] + string + cliStyles.reset
}

module.exports = { cliColor }
