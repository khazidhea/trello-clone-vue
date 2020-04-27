Cypress.Commands.add('login', (username, password) => {
  cy.request({
    method: 'POST',
    url: 'http://127.0.0.1:8000/api/auth/',
    body: { username, password }
  }).then((response) => {
    window.localStorage.setItem('token', response.body.token)
  })
})
