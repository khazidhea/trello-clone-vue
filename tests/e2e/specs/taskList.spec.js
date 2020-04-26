describe('Task List', () => {
  beforeEach(() => {
    cy.visit('/tasks/')
  })

  it('has a list of 2 tasks', () => {
    cy.get('[data-test="task"]').its('length').should('be', 2)
  })
})
