describe('Assign Manager Page', () => {
  beforeEach(() => {
    cy.visit('/employee-hierarchy')
  })

  it('assigns a manager to an employee successfully', () => {
    // Wait for employees to load in dropdown
    cy.get('select').first().should('exist').should('not.be.disabled')
    
    // Select an employee (not null)
    cy.get('select').first().select(1) // Index 1 (skip the "-- Select Employee --" option)

    // Select a manager (different from employee)
    cy.get('select').eq(1).select(1) // Index 1 (adjust based on actual options)

    // Click assign
    cy.get('button').contains('Assign Manager').click()
  })
})
