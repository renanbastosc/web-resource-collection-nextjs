const generator = (plop) => {
  plop.setGenerator('component', {
    description: 'Create a reusable component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your component name?'
      }
    ],
    actions: [
      {
        type: 'add',
        // Plop will create directories for us if they do not exist
        // so it's okay to add files in nested locations.
        path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.tsx',
        templateFile: '.plop/component/component.js.hbs'
      },
      {
        type: 'add',
        // Plop will create directories for us if they do not exist
        // so it's okay to add files in nested locations.
        path: 'src/components/{{pascalCase name}}/styled.tsx',
        templateFile: '.plop/component/styled.js.hbs'
      },
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/styled.spec.tsx',
        templateFile: '.plop/component/styled.spec.js.hbs'
      },
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.spec.tsx',
        templateFile: '.plop/component/component.spec.js.hbs'
      },
      {
        // Adds an index.tsx file if it does not already exist
        type: 'add',
        path: 'src/components/{{pascalCase name}}/index.tsx',
        templateFile: '.plop/injectable-index.js.hbs',
        // If index.js already exists in this location, skip this action
        skipIfExists: true
      }
    ]
  })
}

module.exports = generator
