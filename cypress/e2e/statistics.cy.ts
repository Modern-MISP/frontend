beforeEach(() => {
  cy.defaultLogin();
});

describe('navigate to the Statistics page', () => {
  it('should be able to navigate to the Statistics page', () => {
    cy.visit('/events');
    cy.get('a:contains("Statistics")').should('exist').click();
    cy.url().should('include', '/statistics');
  });
});

const statisticElement = (text: string) => `div:has(> span:contains("${text}")) > :last-child`;
const tableRow = (text: string) => `tr:contains("${text}")`;
const heatmapMonth = (text: string) => `g:has(> text:contains("${text}"))`;
const exampleOrg = (text: string) => `svg:contains("${text}")`;

describe('open Statistics pages', () => {
  it('should be able to navigate to the Statistics Usage Data page', () => {
    cy.visit('/statistics/');
    cy.get('h1:contains("Usage data")').should('exist');
    cy.get(statisticElement('Events')).should('have.text', '0(0)');
    cy.get(statisticElement('Attributes')).first().should('have.text', '0(0)');
    cy.get(statisticElement('Attributes / event')).should('have.text', '0');
    cy.get(statisticElement('Correlations found')).should('have.text', '0');
    cy.get(statisticElement('Proposals active')).should('have.text', '0');
    cy.get(statisticElement('Users')).first().should('have.text', '1');
    cy.get(statisticElement('Organisations')).first().should('have.text', '1');
    cy.get(statisticElement('Local Organisations')).should('have.text', '1');
    cy.get(statisticElement('Event Creator Orgs')).should('have.text', '0');
    cy.get(statisticElement('Average Users / Orgs')).should('have.text', '1');
    cy.get(statisticElement('Discussion threads')).should('have.text', '0(0)');
    cy.get(statisticElement('Discussion posts')).should('have.text', '0(0)');
  });
  it('should be able to navigate to the Statistics Organisation page', () => {
    cy.visit('/statistics/organisations');
    const org = tableRow('Org 1');
    cy.get(org).should('exist');
    cy.get(org).contains('3');
    cy.get(org).contains('5');
    cy.get(org).contains('2');
    cy.get(org).contains('Non-profit');
    cy.get(org).contains('2021-02-01');
  });
  it('should be able to navigate to the Statistics Heatmap page', () => {
    cy.visit('/statistics/activity_heatmap');
    cy.get('h1:contains("Activity Heatmap")').should('exist');
    cy.get('span:contains("A heatmap showing user activity")').should('exist');
    cy.get('select:contains("Organisation 1")').should('exist');
    cy.get('select:contains("Organisation 2")').should('exist');
    cy.get('select:contains("Organisation 3")').should('exist');
    cy.get('select:contains("Organisation 4")').should('exist');
    cy.get('select:contains("Organisation 5")').should('exist');
    cy.get(heatmapMonth('Feb')).should('exist');
    cy.get(heatmapMonth('Feb'))
      .children()
      .should('have.length', 29 + 1);
    cy.get(heatmapMonth('Mar')).should('exist');
    cy.get(heatmapMonth('Mar'))
      .children()
      .should('have.length', 31 + 1);
    cy.get(heatmapMonth('Apr')).should('exist');
    cy.get(heatmapMonth('Apr'))
      .children()
      .should('have.length', 30 + 1);
    cy.get(heatmapMonth('May')).should('exist');
    cy.get(heatmapMonth('May'))
      .children()
      .should('have.length', 31 + 1);
    cy.get(heatmapMonth('Jun')).should('exist');
    cy.get(heatmapMonth('Jun'))
      .children()
      .should('have.length', 29 + 1);
  });
  it('should be able to navigate to the Statistics Attribute Histogram page', () => {
    cy.visit('/statistics/attribute_histogram');
    cy.get('h1:contains("Histogram")').should('exist');
    cy.get('span:contains("This is a histogram")').should('exist');
    cy.get('svg:contains("ip-src")').should('exist');
    cy.get('svg:contains("url")').should('exist');
    cy.get('svg:contains("attachment")').should('exist');
    cy.get('svg:contains("text")').should('exist');
    cy.get('svg:contains("target-user")').should('exist');
    cy.get('svg:contains("ip-dst|port")').should('exist');
    cy.get(exampleOrg('Example Organisation 1')).should('exist');
    cy.get(exampleOrg('Example Organisation 1')).children().should('have.length', 7);
    cy.get(exampleOrg('Example Organisation 2')).should('exist');
    cy.get(exampleOrg('Example Organisation 2')).children().should('have.length', 7);
    cy.get(exampleOrg('Example Organisation 3')).should('exist');
    cy.get(exampleOrg('Example Organisation 3')).children().should('have.length', 7);
    cy.get(exampleOrg('Example Organisation 4')).should('exist');
    cy.get(exampleOrg('Example Organisation 4')).children().should('have.length', 7);
  });
});
