describe('Task', () => {
    beforeEach(() => {
      cy.visit('/tasks/1/')
    })
  
    it('has title', () => {
      cy.get('[data-test="title"]').should('have.text', 'first')
    })
})
