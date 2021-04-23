module.exports = {
  commands: 'add' ,
  expectedArgs: '<num1> <num2>',
  premissionsError: 'no',
  minArgs: 2,
  maxArgs: 2,
  callback: (message, arguments, text) => {
    console.log(arguments)
    console.log(`a this should work`)
  },
  permissions: [],
  requiredRoles: [],
}
