beforeEach(() => {
  cy.defaultLogin();
});

const email = 'cypress-test@example.com';

before(() => {
  // Delete user used for tests
  // This is a horrible hack that should not be used,
  // but idk what else to do until we have automatic database management
  cy.exec(
    `ssh root@db.mmisp.cert.kit.edu 'mysql --safe-updates -e "use misp02; delete from users where email=\\"${email}\\""'`
  );
});

const formLabel = (text: string) => `div:has(span:contains("${text}")) > label`;

describe('user actions', () => {
  let userId;

  it('should create a new user', () => {
    cy.visit('/admin/users/new');

    cy.get('button').then(($btn) => {
      cy.log(`${$btn}`);
    });

    cy.get(formLabel('Email')).type(email);
    cy.get(formLabel('Contact enables')).click();
    cy.get(formLabel('Weekly notifications')).click();
    cy.get(formLabel('Terms accepted')).click();

    cy.get('button:has(span:contains("Save"))').click();

    cy.url()
      .should('not.include', 'new')
      .then((url) => {
        const id = url.split('/').at(-1);
        expect(id).to.be.a('string').and.to.not.equal('new');
        userId = id;
      });
  });

  it('should edit an existing user', () => {
    cy.visit(`/admin/users/${userId}`);

    cy.get("label:has(span:contains('View mode'))").click();
  });
});
