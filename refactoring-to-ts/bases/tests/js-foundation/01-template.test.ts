import { emailTemplate } from '../../src/js-foundation/01-template'

describe('Test in the template file', () => {
  test('emailTemplate should contain a greeting',() =>{
    expect(emailTemplate).toContain('Hi, ') 
  })

  test('emailTemplate should contain a {{name}} and a {{email}}',() => {
    expect(emailTemplate).toMatch(/{{ name }}/)
    expect(emailTemplate).toMatch(/{{ email }}/)

    expect(emailTemplate).toContain('{{ name }}')
    expect(emailTemplate).toContain('{{ email }}')

  })
})