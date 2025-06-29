describe('Employee Page Tests', () => {

  it('should display employee table correctly', () => {
    cy.intercept('GET', '/api/employees/read', { fixture: 'employees.json' }).as('getEmployees')
    cy.visit('/employees')
    cy.wait(['@getEmployees'])
    cy.get('table').should('exist')
    cy.contains('td', 'John Doe').should('exist')
    cy.contains('td', 'john.doe@example.com').should('exist')
    cy.contains('td', 'Engineering').should('exist')
  })

  it('should submit employee form successfully', () => {
    cy.intercept('GET', '/api/employees/read', { fixture: 'employees.json' }).as('getEmployees')
    cy.visit('/employees')
    cy.wait(['@getEmployees'])
    cy.intercept('GET', '/api/projects/read', { fixture: 'projects.json'}).as('getProjects') 
    cy.intercept('POST', '/api/employees/create', {
      statusCode: 201,
      body: {
        employeeId: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        phoneNumber: '9876543210',
        hireDate: '2024-02-10',
        salary: 60000,
        jobId: 'J2002',
        department: 'HR',
        designation: 'INTERN',
        employeeDetails: {
          dateOfBirth: '1995-08-15',
          maritalStatus: 'Married',
          address: {
            street: '456 Elm St',
            city: 'Gotham',
            state: 'NJ',
            zipCode: '07001'
          }
        },
        project: {
          projectId: 1,
        }
      }
    }).as('postEmployee')

    cy.visit('/employees')
    cy.wait('@getProjects')

    cy.get('select#project')
    .should('exist')
    .contains('option', 'HR System')
    .should('exist')

    cy.get('input#firstName').type('Jane')
    cy.get('input#lastName').type('Smith')
    cy.get('input#email').type('jane.smith@example.com')
    cy.get('input#phoneNumber').type('9876543210')
    cy.get('input#salary').type('60000')
    cy.get('input#jobId').type('J2002')
    cy.get('select#department').select('HR')
    cy.get('select#designation').select('INTERN')
    cy.get('input#hireDate').type('2024-02-10')
    cy.get('select#project').select('HR System')
    cy.get('input#dateOfBirth').type('1995-08-15')
    cy.get('select#maritalStatus').select('Married')
    cy.get('input#street').type('456 Elm St')
    cy.get('input#city').type('Gotham')
    cy.get('input#state').type('NJ')
    cy.get('input#zipCode').type('07001')

    cy.get('form').submit()
    cy.wait('@postEmployee')

    cy.contains('Employee created successfully!').should('exist')
    cy.wait(1500)

  })
 it('should display employee in the table', () => {
    cy.intercept('GET', '/api/employees/read', { fixture: 'employees_after.json' }).as('getUpdatedEmployees')
    cy.visit('/employees')
    cy.wait(['@getUpdatedEmployees'])

    cy.get('table').should('exist')
    cy.contains('td', 'Jane Smith').should('exist')
    cy.contains('td', 'jane.smith@example.com').should('exist')
    cy.contains('td', 'HR').should('exist')
 })

//  it('should show the employee details when show button is clicked', () => {
//     cy.intercept('GET', '/api/employees/read', { fixture: 'employees_after.json' }).as('getUpdatedEmployees')
//     cy.visit('/employees')
//     cy.wait(['@getUpdatedEmployees'])
//     cy.intercept('GET', '/api/employees/read/1').as('getEmployeeById')
//     cy.contains('button', 'Show').click()
//     cy.wait('@getEmployeeById')
//     cy.wait(3000) 
//   })

  it('should delete employee when delete button is clicked', () => {
    cy.intercept('GET', '/api/employees/read', { fixture: 'employees_after.json' }).as('getUpdatedEmployees')
    cy.visit('/employees')
    cy.wait(['@getUpdatedEmployees'])
    cy.intercept('DELETE', '/api/employees/remove/1', { statusCode: 204 }).as('deleteEmployee')
    cy.contains('button', 'Delete').click()
    cy.wait('@deleteEmployee')
  })
})