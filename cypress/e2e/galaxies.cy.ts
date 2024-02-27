beforeEach(() => {
  cy.defaultLogin();
});

describe('galaxies', () => {
  it('should be reachable via side menu', () => {
    cy.visit('/events');
    cy.get('aside > nav').find('a[href="/galaxies"]').click();
    cy.wait(100);
    cy.url().should('include', '/galaxies');
  });
});

describe('galaxy cluster', () => {
  let clusterId: string;

  it('should be creatable', () => {
    const cluster = {
      name: "test cluster",
      description: "test description",
      source: "test source",
      authors: ['lorem', 'ipsum'],
      distribution: "3",
      entries: {
        "test key": "test value"
      }
    }

    cy.visit('/galaxies/2/new_cluster');
    cy.get('input[name="value"]').type(cluster.name);
    cy.get('input[name="description"]').type(cluster.description);
    cy.get('input[name="source"]').type(cluster.source);
    cy.get('div:has(> span:contains("Authors")) input').type(cluster.authors.join('\n') + '\n');
    cy.get('select[name="distribution"]').select(cluster.distribution);
    let i = 1;
    for (const key in cluster.entries) {
      cy.get(`tbody tr:nth-of-type(${i}) input:first`).type(key);
      cy.get(`tbody tr:nth-of-type(${i}) input:last`).type(cluster.entries[key]);
      i++;
    }
    cy.get('button:contains(Save)').click();
    cy.wait(100);
    cy.url().should('include', '/galaxies/clusters/');
    cy.url().then((url) => clusterId = url.split('/').at(-1));
    cy.get('main > div > div > div:first-child label:has(input[type="checkbox"]):first').click();  // enter view mode
    const check = (field: string, value: string) => cy.get(
      `form div:has(> span:first-child:contains("${field}")) span:last`
      ).should('have.text', value);
    check("Name", cluster.name);
    check("Description", cluster.description);
    check("Source", cluster.source);
    cy.get('form div:has(> span:first-child:contains("Authors")) > div span').each(($el, index) => {
      cy.wrap($el).should('have.text', cluster.authors[index]);
    });
  });

  it('should be editable', () => {
    cy.visit(`/galaxies/clusters/${clusterId}`);
  });
});
