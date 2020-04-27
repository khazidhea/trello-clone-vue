describe('Task', () => {
  beforeEach(() => {
    cy.login('author', 'author')
    cy.visit('/tasks/1/')
  })

  it('has title', () => {
    cy.get('[data-test="title"]').should('have.text', 'first')
  })
})
