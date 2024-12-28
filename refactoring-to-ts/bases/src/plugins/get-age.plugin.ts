const getAgePlugin = require('get-age')

export const getAge = ({ birthday }: { birthday: string }) =>
  getAgePlugin(birthday)
