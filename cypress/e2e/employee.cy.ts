describe('Employee Management', () => {
  const employee = {
    firstName: 'Sam',
    lastName: 'Jam',
    email: `Sam${Date.now()}@gmail.com`,
    phoneNumber: '1234567890',
    salary: '60000',
    jobId: 'ENG123',
    department: 'ENGINEERING',
    designation: 'SENIOR_ENGINEER',
    hireDate: '2023-01-01',
    project: 'Cypress Project',
    dateOfBirth: '1990-05-10',
    maritalStatus: 'Single',
    address: {
      street: '123 Main St',
      city: 'Metropolis',
      state: 'NY',
      zipCode: '10001'
    }
  };

  beforeEach(() => {
    cy.visit('/employees');
  });

  it('should visit the /projects page', () => {
    cy.contains('Employee Management')
  })

  it('should create a new employee and verify in table', () => {
    cy.get('#firstName').type(employee.firstName);
    cy.get('#lastName').type(employee.lastName);
    cy.get('#email').type(employee.email);
    cy.get('#phoneNumber').type(employee.phoneNumber);
    cy.get('#salary').type(employee.salary);
    cy.get('#jobId').type(employee.jobId);

    cy.get('#department').select(employee.department);
    cy.get('#designation').select(employee.designation);
    cy.get('#hireDate').type(employee.hireDate);

    cy.get('#project').select(employee.project);

    cy.get('#dateOfBirth').type(employee.dateOfBirth);
    cy.get('#maritalStatus').select(employee.maritalStatus);

    cy.get('#street').type(employee.address.street);
    cy.get('#city').type(employee.address.city);
    cy.get('#state').type(employee.address.state);
    cy.get('#zipCode').type(employee.address.zipCode);

    cy.contains('Create Employee').click();

    cy.contains('Employee created successfully!').should('be.visible');

    cy.wait(2000);

    cy.get('table').should('contain', employee.firstName);
    cy.get('table').should('contain', employee.lastName);
    cy.get('table').should('contain', employee.email);

  })
  it('should show an employee details', () => {

    cy.contains('Sam Jam')
      .parents('tr')
      .within(() => {
        cy.get('button.btn-info').click()
      })

    cy.contains('Employee Details')
    cy.wait(2000);
    cy.contains('Close').click();

  })

  it('should delete an employee', () => {

    cy.contains('Sam Jam')
      .parents('tr')
      .within(() => {
        cy.get('button.btn-danger').click()
      })

    cy.contains('Employee deleted successfully!')
  })
  
});

