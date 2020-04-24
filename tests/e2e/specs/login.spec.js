describe('Log in', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('greets with a login header', () => {
    cy.contains('h1', 'Login')
  })

  it('requires login', () => {
    cy.get('[data-test="login"]').click()
    cy.get('[data-test="error"]').should('have.text', 'Login is a required field')
  })

  // it('requires password', () => {

  // })

  // it('shows error given invalid credentials', () => {

  // })

  it('redirects to /tasks on success', () => {
    cy.get('[data-test="username"]').type('author')
    cy.get('[data-test="password"]').type('author')
    cy.get('[data-test="login"]').click()
    cy.location('pathname').should('eq', '/tasks')
  })
})
