import { Default as TaskListDefault } from '../../src/components/TaskList.stories';

// 没有完整的测试环境，暂时使用mock
describe('The Login Page', () => {

  beforeEach(() => {
    cy.intercept('POST', '/authenticate', {
      statusCode: 201,
      body: {
        user: {
          name: 'Alice Carr',
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
        },
      },
    });

    cy.intercept('GET', '/tasks', {
      statusCode: 201,
      body: TaskListDefault.args,
    });
  });

  it('user can authenticate using the login form', () => {
    const email = 'alice.carr@test.com';
    const password = 'k12h1k0$5;lpa@Afn';

    cy.visit('/');

    // Fill out the form
    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(`${password}`);

    // Click the sign-in button
    cy.get('button[type=submit]').click();

    // UI should display the user's task list
    cy.get('[aria-label="tasks"] li').should('have.length', 6);
  });
});
