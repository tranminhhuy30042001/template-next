import inquirer from 'inquirer'

export async function askFormConfig() {
  const base = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Resource name (e.g. settings):',
      validate: v => !!v || 'Required',
    },
    {
      type: 'input',
      name: 'pascal',
      message: 'PascalCase name (e.g. Settings):',
      validate: v => !!v || 'Required',
    },
    {
      type: 'number',
      name: 'count',
      message: 'How many fields?',
      validate: v => v > 0 || 'Must be > 0',
    },
  ])

  const fields = []
  for (let i = 0; i < base.count; i++) {
    const field = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: `Field #${i + 1} name (key in type):`,
      },
      {
        type: 'input',
        name: 'label',
        message: `Field #${i + 1} label:`,
      },
      {
        type: 'list',
        name: 'type',
        message: `Field #${i + 1} type:`,
        choices: [
          'input',
          'select',
          'multi-select',
          'autocomplete',
          'number',
          'checkbox',
          'textarea',
          'upload',
          'dragger',
        ],
      },
      {
        type: 'confirm',
        name: 'required',
        message: 'Required?',
        default: false,
      },
      {
        type: 'input',
        name: 'api',
        message: 'API (optional):',
      },
      {
        type: 'input',
        name: 'dependsOn',
        message: 'Depends on field (optional):',
      },
      {
        type: 'number',
        name: 'colSpan',
        message: 'Col span (default 24):',
        default: 24,
      },
    ])

    fields.push(field)
  }

  return {
    ...base,
    fields,
  }
}
