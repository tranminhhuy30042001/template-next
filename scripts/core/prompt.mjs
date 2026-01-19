import inquirer from 'inquirer'

export async function askConfig() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'API name (e.g. settings):',
      validate: v => !!v || 'Name is required',
    },
    {
      type: 'list',
      name: 'shape',
      message: 'Data shape:',
      choices: ['object', 'array'],
      default: 'object',
    },
    {
      type: 'confirm',
      name: 'needCombine',
      message: 'Need combine hook?',
      default: false,
    },
    {
      type: 'input',
      name: 'combineName',
      message: 'Combine hook name (e.g. AppBootstrap):',
      when: answers => answers.needCombine,
      validate: v => !!v || 'Combine name is required',
    },
    {
      type: 'checkbox',
      name: 'methods',
      message: 'Methods:',
      choices: ['GET', 'POST', 'PUT'],
      validate: v => v.length > 0 || 'Select at least one method',
    },
  ])

  return {
    name: answers.name.trim(),
    shape: answers.shape,
    needCombine: answers.needCombine ? 'yes' : 'no',
    combineName: answers.combineName ?? null,
    methods: answers.methods,
  }
}
