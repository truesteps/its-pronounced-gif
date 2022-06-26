describe('Search Page', () => {
	it('should visit search page', () => {
		cy.visit('/search');

		cy.contains('Search GIFs');
	});

	it('should autofocus search input when visiting search page', () => {
		cy.visit('/search');

		cy.contains('Search GIFs');

		cy.get('.search-input')
			.children()
			.then(($children: JQuery<HTMLElement>) => {
				const $inputChild = $children.find('input');

				expect($inputChild.is(':focus')).to.be.true;
			});
	});

	it('should search for gifs and see results', () => {
		cy.visit('/search');

		cy.contains('Search GIFs');

		cy.get('.search-input')
			.children()
			.then(($children: JQuery<HTMLElement>) => {
				const $inputChild = $children.find('input');

				expect($inputChild.is(':focus')).to.be.true;
			});

		cy
			.get('.search-input')
			.type('hacker');

		cy.get('.gif-card')
			.should('have.length.of.at.least', 1);
	});

	it('should search for gifs and load more results if clicked on the load more gifs button', () => {
		cy.visit('/search');

		cy.contains('Search GIFs');

		cy.get('.search-input')
			.children()
			.then(($children: JQuery<HTMLElement>) => {
				const $inputChild = $children.find('input');

				expect($inputChild.is(':focus')).to.be.true;
			});

		cy.get('.search-input')
			.type('pingu');

		cy.get('.gif-card')
			.should('have.length.of.at.least', 1);

		cy.get('.gif-card')
			.its('length')
			.then(($length: number) => {
				cy.get('.load-more-gifs').click();

				cy.get('.gif-card')
					.should('have.length.of.at.least', $length + 1);
			});
	});

	it('should be able to clear search input by clicking on the clearable icon', () => {
		cy.visit('/search');

		cy.contains('Search GIFs');

		cy.get('.search-input')
			.children()
			.then(($children: JQuery<HTMLElement>) => {
				const $inputChild = $children.find('input');

				expect($inputChild.is(':focus')).to.be.true;
			});

		cy.get('.search-input')
			.type('midsummer');

		cy.get('.search-input button')
			.click();

		cy.get('.search-input input')
			.should('have.value', '');
	});

	it('should pass the search term into url', () => {
		cy.visit('/search');

		cy.contains('Search GIFs');

		cy.get('.search-input')
			.children()
			.then(($children: JQuery<HTMLElement>) => {
				const $inputChild = $children.find('input');

				expect($inputChild.is(':focus')).to.be.true;
			});

		cy.get('.search-input')
			.type('midsummer');

		cy.url()
			.should('contain', `?search=${encodeURIComponent('midsummer')}`);
	});

	it('should remove the search term from url if I go back in history', () => {
		cy.visit('/search');

		cy.contains('Search GIFs');

		cy.get('.search-input')
			.children()
			.then(($children: JQuery<HTMLElement>) => {
				const $inputChild = $children.find('input');

				expect($inputChild.is(':focus')).to.be.true;
			});

		cy.get('.search-input')
			.type('midsummer');

		cy.url()
			.should('contain', `?search=${encodeURIComponent('midsummer')}`);

		cy.go('back');

		cy.url()
			.should('not.contain', '?search=midsummer');
	});
});
