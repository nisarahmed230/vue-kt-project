describe('Project Management Page', () => {
  beforeEach(() => {
    // Intercept default fetch all projects
    cy.intercept('GET', '/api/projects/read', { fixture: 'projects.json' }).as('getAllProjects')

    // Visit the root (adjust route if needed)
    cy.visit('/projects')
    cy.wait('@getAllProjects')
  })

  it('displays all projects on initial load', () => {
    cy.get('table tbody tr').should('have.length', 2)
    cy.contains('HR System').should('exist')
    cy.contains('Billing App').should('exist')
  })

  it('filters to no-employee projects on button click', () => {
    cy.intercept('GET', '/api/projects/read/no-employees', { fixture: 'noEmployeeProjects.json' }).as('getNoEmpProjects')

    cy.get('[data-test="no-employee-projects-btn"]').click()
    cy.wait('@getNoEmpProjects')

    cy.get('table tbody tr').should('have.length', 1)
    cy.contains('Unassigned Project').should('exist')
  })

  it('deletes a project and updates the list', () => {
    cy.intercept('DELETE', '/api/projects/delete/1', {
      statusCode: 200
    }).as('deleteProject')

    cy.get('table tbody tr').should('have.length', 2)

    // Delete the first project
    cy.contains('tr', 'HR System').within(() => {
      cy.get('button').contains('Delete').click()
    })

    cy.wait('@deleteProject')
    cy.wait(1500)
    cy.contains('HR System').should('not.exist')
  })

  it('creates a new project via form', () => {
    const newProject = {
      projectId: 99,
      projectName: 'New Cypress Project',
      startDate: '2025-06-01',
      endDate: '2025-12-01',
    }

    cy.intercept('POST', '/api/projects/create', {
      body: newProject
    }).as('createProject')

    cy.get('#projectName').type(newProject.projectName)
    cy.get('#startDate').type(newProject.startDate)
    cy.get('#endDate').type(newProject.endDate)

    cy.contains('button', 'Create Project').click()
    cy.wait('@createProject')
  })
})
