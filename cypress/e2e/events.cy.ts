import { format } from 'date-fns';

const formLabel = (text: string) => `div:has(span:contains("${text}")) > label`;
const formSelect = (text: string) => `div:has(span:contains("${text}")) > div > select`;

beforeEach(() => {
  cy.defaultLogin();
  cy.visit('/events');
});

describe('new event', () => {
  const event = {
    date: '2014-04-03',
    distribution: '3', // all communities
    threat_level: '4', // high
    analysis: '1', // initial
    info: 'test info',
    extends_uuid: 'b08fc78d-fcca-4075-86ed-b312b0fb2bdf'
  };
  beforeEach(() => {
    cy.toggleMode(); //enter edit mode
    cy.get('#actionBar > :contains("Add Event")').click();
  });
  it('should be creatable with uuid', () => {
    cy.get(formLabel('Date')).type(format(event.date, 'yyyy-MM-dd'));
    cy.get(formSelect('Distribution')).select(event.distribution);
    cy.get(formSelect('Threat Level')).select(event.threat_level);
    cy.get(formSelect('Analysis')).select(event.analysis);
    cy.get(formLabel('Event info')).type(event.info);
    cy.get(formLabel('Extends UUID')).type(event.extends_uuid);
    cy.get('button:contains(Save)').click();
    cy.wait(100);
    cy.url().should('include', '/events');
    cy.url().should('not.contain', '/events/new');

    cy.get('input[name="info"]').should('have.value', event.info);
    cy.get('select[name="distribution"]').should('have.value', event.distribution);
    cy.get('select[name="threat_level_id"]').should('have.value', event.threat_level);
    cy.get('select[name="analysis"]').should('have.value', event.analysis);
    cy.get('input[name=published]').should('not.be.checked');
    cy.get('input[name="date"]').should('have.value', event.date);
    cy.get('form section:first div:has(> span:contains("Creator user")) > :last').should(
      'contain.text',
      'admin@admin.test'
    );
    cy.get('form section:first div:has(> span:contains("Creator Org")) > :last').should(
      'contain.text',
      'EINS'
    );
    cy.get('form section:first div:has(> span:contains("Owner Org")) > :last').should(
      'contain.text',
      'EINS'
    );
    cy.get('form section:first div:has(> span:contains("ID")) > :last')
      .invoke('val')
      .should((value) => {
        expect(Number.isInteger(+value)).to.eq(true);
      });

    cy.get("form section:first div:has(> span:contains('UUID')) > :last-child")
      .invoke('text')
      .should('match', new RegExp('[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}'));

    cy.get('select[name=distribution]').should('have.value', event.distribution);
    cy.get('form section:first div:has(> span:contains("Attribute Count")) > :last').should(
      'contain.text',
      '0 (0 Objects)'
    );

    cy.get('input[name="extends_uuid"]').should('have.value', event.extends_uuid);
  });
  it('should be creatable without uuid', () => {
    cy.get(formLabel('Date')).type(format(event.date, 'yyyy-MM-dd'));
    cy.get(formSelect('Distribution')).select(event.distribution);
    cy.get(formSelect('Threat Level')).select(event.threat_level);
    cy.get(formSelect('Analysis')).select(event.analysis);
    cy.get(formLabel('Event info')).type(event.info);
    cy.get('button:contains(Save)').click();
    cy.wait(100);
    cy.url().should('include', '/events');
    cy.url().should('not.contain', '/events/new');

    cy.get('input[name="info"]').should('have.value', event.info);
    cy.get('select[name="threat_level_id"]').should('have.value', event.threat_level);
    cy.get('select[name="analysis"]').should('have.value', event.analysis);
    cy.get('input[name=published]').should('not.be.checked');
    cy.get('input[name="date"]').should('have.value', event.date);
    cy.get('form section:first div:has(> span:contains("Creator user")) > :last').should(
      'contain.text',
      'admin@admin.test'
    );
    cy.get('form section:first div:has(> span:contains("Creator Org")) > :last').should(
      'contain.text',
      'EINS'
    );
    cy.get('form section:first div:has(> span:contains("Owner Org")) > :last').should(
      'contain.text',
      'EINS'
    );
    cy.get('form section:first div:has(> span:contains("ID")) > :last')
      .invoke('val')
      .should((value) => {
        expect(Number.isInteger(+value)).to.eq(true);
      });

    cy.get("form section:first div:has(> span:contains('UUID')) > :last-child")
      .invoke('text')
      .should('match', new RegExp('[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}'));

    cy.get('select[name=distribution]').should('have.value', event.distribution);
    cy.get('form section:first div:has(> span:contains("Attribute Count")) > :last').should(
      'contain.text',
      '0 (0 Objects)'
    );

    cy.get('input[name="extends_uuid"]').should('have.value', '');
  });
  it('should not be creatable without entering info', () => {
    cy.get('button:contains(Save)').click();
    cy.wait(100);
    cy.url().should('include', '/events/new');
  });
  it('should be creatable with minimal entries', () => {
    cy.get(formLabel('Event info')).type(event.info);
    cy.get('button:contains(Save)').click();
    cy.wait(100);
    cy.url().should('include', '/events');

    cy.get('input[name="info"]').should('have.value', event.info);
    cy.get('select[name="threat_level_id"]').should('have.value', 1);
    cy.get('select[name="analysis"]').should('have.value', 0);
    cy.get('input[name=published]').should('not.be.checked');
    cy.get('input[name="date"]').should('have.value', format(new Date(), 'yyyy-MM-dd'));
    cy.get('form section:first div:has(> span:contains("Creator user")) > :last').should(
      'contain.text',
      'admin@admin.test'
    );
    cy.get('form section:first div:has(> span:contains("Creator Org")) > :last').should(
      'contain.text',
      'EINS'
    );
    cy.get('form section:first div:has(> span:contains("Owner Org")) > :last').should(
      'contain.text',
      'EINS'
    );
    cy.get('form section:first div:has(> span:contains("ID")) > :last')
      .invoke('val')
      .should((value) => {
        expect(Number.isInteger(+value)).to.eq(true);
      });

    cy.get("form section:first div:has(> span:contains('UUID')) > :last-child")
      .invoke('text')
      .should('match', new RegExp('[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}'));

    cy.get('select[name=distribution]').should('have.value', 0);
    cy.get('form section:first div:has(> span:contains("Attribute Count")) > :last').should(
      'contain.text',
      '0 (0 Objects)'
    );

    cy.get('input[name="extends_uuid"]').should('have.value', '');
  });
  it('user should exit creation process', () => {
    cy.get('#actionBar > :contains("Cancel")').click();
    cy.url().should('include', '/events');
    cy.url().should('not.contain', '/events/new');
  });
});
describe('edit event', () => {
  const newEvent = {
    date: '1532-02-03',
    distribution: '3', // all communities
    threat_level: '4', // high
    analysis: '1', // initial
    info: 'edited info',
    extends_uuid: 'b08fc78d-fcca-i4075-86ed-b312b0fb2bdf'
  };
  beforeEach(() => {
    cy.visit('/events/2');
    cy.toggleMode(); //enter edit mode
  });
  it('should be editable with uuid', () => {
    cy.get(formLabel('Info')).clear().type(newEvent.info);
    cy.get(formLabel('Date')).clear().type(newEvent.date);
    cy.get(formSelect('Distribution')).select(newEvent.distribution);
    cy.get(formSelect('Threat Level')).select(newEvent.threat_level);
    cy.get(formSelect('Analysis')).select(newEvent.analysis);
    cy.get(formLabel('Extends UUID')).clear().type(newEvent.extends_uuid);
    cy.get('button:contains(Save)').click();
    cy.wait(100);
    cy.url().should('include', '/events/2');

    cy.get('input[name="info"]').should('have.value', newEvent.info);
    cy.get('select[name="threat_level_id"]').should('have.value', newEvent.threat_level);
    cy.get('select[name="analysis"]').should('have.value', newEvent.analysis);
    cy.get('input[name=published]').should('not.be.checked');
    cy.get('input[name="date"]').should('have.value', newEvent.date);
    cy.get('form section:first div:has(> span:contains("Creator user")) > :last').should(
      'contain.text',
      'admin@admin.test'
    );
    cy.get('form section:first div:has(> span:contains("Creator Org")) > :last').should(
      'contain.text',
      'EINS'
    );
    cy.get('form section:first div:has(> span:contains("Owner Org")) > :last').should(
      'contain.text',
      'EINS'
    );

    cy.get('form section:first div:has(> span:contains("ID")) > :last-child')
      .first()
      .should('have.text', '2');
    cy.get('form section:first div:has(> span:contains("UUID")) > :last-child')
      .first()
      .should('have.text', '54ae77a8-f9e7-4bc3-abbc-672c11f2e00f');

    cy.get('select[name=distribution]').should('have.value', newEvent.distribution);
    cy.get('form section:first div:has(> span:contains("Attribute Count")) > :last').should(
      'contain.text',
      '20 (0 Objects)'
    );
    cy.get('input[name="extends_uuid"]').should('have.value', newEvent.extends_uuid);
    cy.toggleMode(); //enter view mode
  });
  it('should be editable without uuid', () => {
    cy.get(formLabel('Info')).clear().type(newEvent.info);
    cy.get(formLabel('Date')).clear().type(format(newEvent.date, 'yyyy-MM-dd'));
    cy.get(formSelect('Distribution')).select(newEvent.distribution);
    cy.get(formSelect('Threat Level')).select(newEvent.threat_level);
    cy.get(formSelect('Analysis')).select(newEvent.analysis);
    cy.get(formLabel('Extends UUID')).clear();
    cy.get('button:contains(Save)').click();
    cy.wait(100);
    cy.url().should('include', '/events/2');

    cy.get('input[name="info"]').should('have.value', newEvent.info);
    cy.get('select[name="threat_level_id"]').should('have.value', newEvent.threat_level);
    cy.get('select[name="analysis"]').should('have.value', newEvent.analysis);
    cy.get('input[name=published]').should('not.be.checked');
    cy.get('input[name="date"]').should('have.value', newEvent.date);
    cy.get('form section:first div:has(> span:contains("Creator user")) > :last').should(
      'contain.text',
      'admin@admin.test'
    );
    cy.get('form section:first div:has(> span:contains("Creator Org")) > :last').should(
      'contain.text',
      'EINS'
    );
    cy.get('form section:first div:has(> span:contains("Owner Org")) > :last').should(
      'contain.text',
      'EINS'
    );
    cy.get('form section:first div:has(> span:contains("ID")) > :last-child')
      .first()
      .should('have.text', '2');
    cy.get('form section:first div:has(> span:contains("UUID")) > :last-child')
      .first()
      .should('have.text', '54ae77a8-f9e7-4bc3-abbc-672c11f2e00f');

    cy.get('select[name=distribution]').should('have.value', newEvent.distribution);
    cy.get('form section:first div:has(> span:contains("Attribute Count")) > :last').should(
      'contain.text',
      '20 (0 Objects)'
    );
    cy.get('input[name="extends_uuid"]').should('have.value', '');
    cy.toggleMode(); //enter view mode
  });
  it('date should be clearable', () => {
    cy.get(formLabel('Date')).clear();
    cy.get('button:contains(Save)').click();
    cy.wait(100);
    cy.toggleMode(); //enter view mode
    cy.get('form section:first div:has(> span:contains("Date")) > :last').should(
      'contain.text',
      format(new Date(), 'yyyy-MM-dd')
    );
  });
  it('should not be saved if info cleared', () => {
    cy.get(formLabel('Info')).clear().type('clear test');
    cy.get('button:contains(Save)').click();
    cy.wait(100);
    cy.get(formLabel('Info')).clear();
    cy.get('button:contains(Save)').click();
    cy.wait(100);
    cy.toggleMode(); //enter view mode
    cy.get('form section:first div:has(> span:contains("Info")) > :last').should(
      'contain.text',
      'clear test'
    );
  });
  it('user should exit edit process', () => {
    cy.get('#actionBar > :contains("Cancel")').click();
    cy.url().should('include', '/events');
    cy.url().should('not.contain', '/events/2');
  });
});
describe('view events', () => {
  it('should be accessible via url', () => {
    cy.visit('/events/2');
    cy.url().should('include', '/events/2');
  });
  it('should be accessible via event list', () => {
    cy.get('tbody > tr:nth-child(2)').click();
    cy.url().should('include', '/events/2');
  });
});
describe('publish event', () => {
  beforeEach(() => {
    cy.visit('/events/2');
    cy.toggleMode(); //enter edit mode
  });
  it('should be publishable', () => {
    cy.get('[type="checkbox"]').last().check({ force: true });
    cy.get('button:contains(Save)').click();
    cy.wait(100);
    cy.url().should('include', '/events/2');
    cy.get('input[type=checkbox]').last().should('be.checked');
    cy.toggleMode(); //enter view mode
    cy.get('form section:first div:has(> span:contains("Published")) > :last').should(
      'contain.text',
      'Yes'
    );
  });
  it('should be unpublishable', () => {
    cy.get('[type="checkbox"]').last().uncheck({ force: true });
    cy.get('button:contains("Save")').click();
    cy.wait(100);
    cy.url().should('include', '/events/2');
    cy.get('input[type=checkbox]').last().should('be.not.checked');
    cy.toggleMode(); //enter view mode
    cy.get('form section:first div:has(> span:contains("Published")) > :last').should(
      'contain.text',
      'No'
    );
  });
});
