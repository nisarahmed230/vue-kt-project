describe('Project Management Page', () => {
    beforeEach(() => {
        cy.visit('/projects')
    })
  it('should visit the /projects page', () => {
    cy.contains('Project Management')
  })

  it('should fill and submit the project form', () => {

    cy.get('#projectName').type('Cypress Project')
    cy.get('#startDate').type('2024-01-01')
    cy.get('#endDate').type('2024-12-31')
    cy.get('button[type="submit"]').click()

    cy.contains('Project created successfully!')
  })

  it('should display project table and delete a project', () => {

    cy.contains('Cypress Project')
      .parents('tr')
      .within(() => {
        cy.get('button.btn-danger').click()
      })

    cy.contains('Project deleted successfully!')
  })

  it('should load all projects when "All Projects" button is clikced', () => {

    cy.get('[data-test="all-projects-btn"]').click()
    cy.get('[data-test="no-employee-projects-btn"]').click()
    cy.visit('/projects')
  })
})
