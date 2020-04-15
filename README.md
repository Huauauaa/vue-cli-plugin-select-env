# vue-cli-plugin-select-env

## usage
### install
> install plugin

`vue add select-env` or `vue invoke select-env`

### config
> create dev.option.js

``` javascript
const inquirer = require('inquirer');

const choices = [
  {
    name: 'foo',
    target: 'http://foo.com',
  },
  {
    name: 'bar',
    target: 'http://bar.com',
  },
];

const promptList = [
  {
    type: 'list',
    message: 'Choose the environment:',
    name: 'env',
    choices,
  },
];

async function getOption() {
  const answer = await inquirer.prompt(promptList);
  const option = choices.find(choice => {
    return choice.name === answer.env;
  });
  return option;
}

module.exports = {
  getOption,
};
```
### run 
`yarn serve --select-env`