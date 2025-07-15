import { format } from 'date-fns';

const formLabel = (text: string) => `div:has(span:contains("${text}")) > label`;
const formSelect = (text: string) => `div:has(span:contains("${text}")) > div > select`;

beforeEach(() => {
  cy.defaultLogin();
  cy.visit('/events/');
  cy.wait(100);
});

describe('Open freetext import tool', () => {
  it('should open the freetext import tool', () => {
    const event = {
      date: '2014-04-03',
      distribution: '3', // all communities
      threat_level: '4', // high
      analysis: '1', // initial
      info: 'cypress test freetext-import'
    };
    cy.toggleMode(); //enter edit mode
    cy.wait(100);
    cy.get('#actionBar > :contains("Add Event")').click();
    cy.wait(100);

    cy.get(formLabel('Date')).type(format(event.date, 'yyyy-MM-dd'));
    cy.get(formSelect('Distribution')).select(event.distribution);
    cy.get(formSelect('Threat Level')).select(event.threat_level);
    cy.get(formSelect('Analysis')).select(event.analysis);
    cy.get(formLabel('Event info')).type(event.info);
    cy.get('button:contains(Save)').click();
    cy.wait(100);

    cy.get('a:contains("Event Attributes")').click();
    cy.url().should('include', 'attributes');

    //    cy.toggleMode();

    cy.get('#freetext-import').should('not.exist');

    cy.get('button:contains(Freetext Import Tool)').should('exist').click();

    cy.get('#freetext-import').should('exist');

    cy.get('button:contains(Close Freetext Import Tool)').click();

    cy.get('#freetext-import').should('not.exist');
  });
});

describe('Freetext import tool', () => {
  it('should return as many attributes as were entered', () => {
    const event = {
      date: '2014-04-03',
      distribution: '3', // all communities
      threat_level: '4', // high
      analysis: '1', // initial
      info: 'cypress test freetext-import'
    };
    cy.toggleMode(); //enter edit mode
    cy.wait(100);
    cy.get('#actionBar > :contains("Add Event")').click();
    cy.wait(100);

    cy.get(formLabel('Date')).type(format(event.date, 'yyyy-MM-dd'));
    cy.get(formSelect('Distribution')).select(event.distribution);
    cy.get(formSelect('Threat Level')).select(event.threat_level);
    cy.get(formSelect('Analysis')).select(event.analysis);
    cy.get(formLabel('Event info')).type(event.info);
    cy.get('button:contains(Save)').click();
    cy.wait(100);

    cy.get('a:contains("Event Attributes")').click();
    cy.url().should('include', 'attributes');

    cy.intercept({
      method: 'POST',
      url: 'events/freeTextImport/**'
    }).as('startFreeTextImport');
    cy.intercept({
      method: 'GET',
      url: '/jobs/**'
    }).as('jobsFreeTextImport');

    cy.get('button:contains(Freetext Import Tool)').should('exist').click();

    cy.get('#freetext-import').should('exist');

    cy.get('textarea')
      .focus()
      .type('https://test.url{enter}3961eae797dbb7ff909385fc739be743{enter}file.type');

    cy.intercept('GET', '/users/**').as('getAttributes');

    cy.get('button:contains(Submit)').click();

    cy.wait('@startFreeTextImport').then((interception) => {
      console.log(interception.request.body);
      console.log(interception.response.body);
      console.log('Status Code is:', interception.response.statusCode);
      if (interception.response.statusCode != 200) {
        cy.wait('@jobsFreeTextImport').then((jobinterception) => {
          console.log(jobinterception.request.body);
          console.log(jobinterception.response.body);
        });
      }
    });

    cy.get('span:contains(Freetext Import)').should('exist');

    cy.get('tr:contains("https://test.url")')
      .should('exist', { timeout: 10000 })
      .click({ force: true });
    cy.get('tr:contains("3961eae797dbb7ff909385fc739be743")').should('exist');
    cy.get('tr:contains("file.type")').should('exist');

    cy.wait(100);
    cy.get('label:contains("Save")').click();
    cy.wait(1000);

    cy.get('button:contains("Close Freetext Import Tool")').click();

    cy.get('#freetext-import').should('not.exist');

    const imported = cy.get('tbody').children().last();
    imported.should('exist');
    imported.should('contain.text', 'https://test.url');
    imported.click();
    cy.get('button:contains("Delete Attribute")').click();
  });
});
