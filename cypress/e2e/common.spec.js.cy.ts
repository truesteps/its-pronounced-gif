describe('Common', () => {
	it('should be able to open navigation bar', () => {
		cy.visit('/');

		cy.contains('Trending GIFs');

		cy.get('.hamburger-menu-button')
			.focus()
			.click();

		cy.get('.v-navigation-drawer')
			.should('be.visible');
	});

	it('should be able to navigate from home page to search page', () => {
		cy.visit('/');

		cy.contains('Trending GIFs');

		cy.get('.hamburger-menu-button')
			.focus()
			.click();

		cy.get('.v-navigation-drawer')
			.should('be.visible');

		cy.get('.link-to-search')
			.focus()
			.click();

		cy.contains('Search GIFs');
	});

	it('should be able to navigate from search page to home page', () => {
		cy.visit('/search');

		cy.contains('Search GIFs');

		cy.get('.hamburger-menu-button')
			.focus()
			.click();

		cy.get('.v-navigation-drawer')
			.should('be.visible');

		cy.get('.link-to-trends')
			.focus()
			.click();

		cy.contains('Trending GIFs');
	});

	it('should return to home page after clicking logo', () => {
		cy.visit('/search');

		cy.contains('Search GIFs');

		cy.get('.logo')
			.focus()
			.click();

		cy.contains('Trending GIFs');
	});
});
