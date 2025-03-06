// Test application functions with Cypress
describe('ShortLink URL Shortening Web App', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('It should create a short URL, copy, not allow to generate same link', () => {
    // Shorten the valid URL
    cy.get('input[placeholder="Enter URL to shorten in seconds!"]').type(
      'https://www.finn.com/de-DE'
    );
    cy.get('button').contains('Shorten for free').click();
    cy.get('.text-lg').should('contain', 'Your shortened URL:');
    // Copy short link
    cy.get('button').contains('Copy').click();
    // Check alert content
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Short URL copied to clipboard!');
    });
    // Try to shorten the same URL
    cy.get('button').contains('Shorten for free').click();
    cy.get('.text-red-700').should(
      'contain',
      'This URL is already shortened. Copy from below.'
    );
    // Check copied content and redirection
    cy.get('input[readonly]')
      .invoke('val')
      .then((shortURL) => {
      // Ensure shortURL is a string
      expect(shortURL).to.be.a('string');
        cy.window().then((win) => {
          win.navigator.clipboard.readText().then((clipboardText) => {
            expect(clipboardText).to.eq(shortURL);
          });
        });
        // Cypress does not support cross origin yet
        // if (typeof shortURL === 'string') {
        //   cy.visit(shortURL);
        //   cy.url().should('eq', 'https://www.finn.com/de-DE');
        // }
      });
  });

  it('It should not allow to shorten the short links', () => {
    cy.get('input[placeholder="Enter URL to shorten in seconds!"]').type(
      'https://localhost:5000/api/abcde'
    );
    cy.get('button').contains('Shorten for free').click();
    cy.get('.text-red-700').should(
      'contain',
      'The provided URL must be valid and it cannot be a short link.'
    );
  });
});
