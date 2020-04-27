describe('Log in', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('redirects other requests to login', () => {
    cy.visit('/')
    cy.contains('h1', 'Login')
  })

  it('greets with a login header', () => {
    cy.contains('h1', 'Login')
  })

  it('requires username', () => {
    cy.get('[data-test="login"]').should('be.disabled')
    cy.get('[data-test="username"]').click()
    cy.get('[data-test="password"]').click()
    cy.get('.v-messages__message').should('have.text', 'Username is required')
  })

  it('requires password', () => {
    cy.get('[data-test="login"]').should('be.disabled')
    cy.get('[data-test="password"]').click()
    cy.get('[data-test="username"]').click()
    cy.get('.v-messages__message').should('have.text', 'Password is required')
  })

  it('shows error given invalid credentials', () => {
    cy.get('[data-test="username"]').type('bad')
    cy.get('[data-test="password"]').type('credentials')
    cy.get('[data-test="login"]').click()
    cy.get('[data-test="error"]').should('have.text', 'Unable to log in with provided credentials.')
  })

  it('redirects to /tasks on success', () => {
    cy.get('[data-test="username"]').type('author')
    cy.get('[data-test="password"]').type('author')
    cy.get('[data-test="login"]').click()
    cy.location('pathname').should('eq', '/tasks')
  })
})
