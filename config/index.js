const dev = require('./dev')
const production = require('./production')
const staging = require('./staging')

const allEnvs = {
  production,
  staging
}

const cfg = allEnvs[process.env.NODE_ENV] || dev

module.exports = cfg
