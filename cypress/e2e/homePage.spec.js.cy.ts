describe('Home Page', () => {
	it('should visit the home page', () => {
		cy.visit('/');
	});

	it('should visit the home page and sees gifs loaded', () => {
		cy.visit('/');

		cy.contains('Trending GIFs');

		cy.get('.gif-card')
			.should('have.length.of.at.least', 1);
	});

	it('should visit the home page, clicks on load more GIFs to load more gifs', () => {
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

	it('should visit the home page, clicks on a gif and copies it\'s url to clipboard', () => {
		cy.visit('/');

		cy.contains('Trending GIFs');

		cy.get('.gif-card')
			.should('have.length.of.at.least', 1);

		cy.get('.gif-card')
			.first()
			.focus()
			.click();

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

	it('should start BURNING mode if clicked on the load more button more than 3 times', () => {
		cy.visit('/');

		cy.contains('Trending GIFs');

		[0, 1, 2].forEach((item: number) => {
			cy.get('.load-more-gifs').click();
		});

		cy.contains('Load MORE FUCKING GIFs');
	});
});
