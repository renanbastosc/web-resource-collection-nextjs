const generator = (plop) => {
  plop.setGenerator('hook', {
    description: 'Create a reusable react hook',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'How do you wanna call your hook? (camelCase)'
      }
    ],
    actions: [
      {
        type: 'add',
        // Plop will create directories for us if they do not exist
        // so it's okay to add files in nested locations.
        path: 'src/shared/hooks/use{{pascalCase name}}.tsx',
        templateFile: '.plop/hook/hook.js.hbs'
      },
      {
        type: 'add',
        // Plop will create directories for us if they do not exist
        // so it's okay to add files in nested locations.
        path: 'src/shared/hooks/use{{pascalCase name}}.spec.tsx',
        templateFile: '.plop/hook/hook.js.spec.hbs'
      }
    ]
  })
}

module.exports = generator
