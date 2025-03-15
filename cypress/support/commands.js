// The Wave Trial page has a lot of texts that are padded with (seemingly) random amounts of whitespaces and newlines.
// This command will trim the text of the element and compare it to the expected text, strictly.
// Sometimes this is preferable over `contains.text` because it's more strict.
Cypress.Commands.add('shouldHaveTextAfterTrimming', { prevSubject: 'element' }, (subject, expectedText) => {
    cy.wrap(subject)
      .invoke('text')
      .should((text) => {
        expect(text.trim()).to.equal(expectedText);
      });
});
  