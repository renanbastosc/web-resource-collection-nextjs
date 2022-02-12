const generateComponent = require('./.plop/component')
const generateHook = require('./.plop/hook')

const plop = (plop) => {
  generateComponent(plop)
  generateHook(plop)
}

module.exports = plop
