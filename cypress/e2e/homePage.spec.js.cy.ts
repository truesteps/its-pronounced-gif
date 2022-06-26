describe('Home Page', () => {
	it('should visit the home page', () => {
		cy.visit('/');
	});

	it('visits the home page and sees gifs loaded', () => {
		cy.visit('/');

		cy.contains('Trending GIFs');

		cy.get('.gif-card')
			.should('have.length.of.at.least', 1);
	});

	it('visits the home page, clicks on load more GIFs to load more gifs', () => {
		cy.visit('/');

		cy.contains('Trending GIFs');

		cy.get('.gif-card').should('have.length.of.at.least', 1);

		cy.get('.gif-card')
			.its('length')
			.then(($length: number) => {
				cy.get('.load-more-gifs').click();

				cy.get('.gif-card')
					.should('have.length.of.at.least', $length + 1);
			});
	});

	it('visits the home page, clicks on a gif and copies it\'s url to clipboard', () => {
		cy.visit('/', {
			onBeforeLoad($window: Window): void {
				cy.spy($window.navigator.clipboard, 'writeText').as('clipboard');
			},
		});

		cy.contains('Trending GIFs');

		cy.get('.gif-card')
			.should('have.length.of.at.least', 1);

		cy.get('.gif-card').first().click();

		cy.get('.gif-card')
			.first()
			.invoke('attr', 'data-test-url')
			.then(($url: string) => {
				cy.window()
					.its('navigator.clipboard')
					.invoke('readText')
					.should('equal', $url);
			});
	});
});
